import { useState, useEffect, useRef } from 'react';
import ResourcePanel from './components/ResourcePanel';
import TileGrid from './components/TileGrid';
import VolumeControl from './components/VolumeControl';
import HomePage from './components/HomePage';
import PageNavigation from './components/PageNavigation';
import { VolumeProvider } from './contexts/VolumeContext';
import {
  loadResources,
  saveResources,
  loadPages,
  savePages,
  exportData,
  importData
} from './utils/storage';
import './App.css';

function App() {
  const [resources, setResources] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home' or page id
  const isInitialMountResources = useRef(true);
  const isInitialMountPages = useRef(true);

  // Load data on mount
  useEffect(() => {
    const loadedResources = loadResources();
    const loadedPages = loadPages();
    setResources(loadedResources);
    setPages(loadedPages);
  }, []);

  // Save resources when they change
  useEffect(() => {
    if (isInitialMountResources.current) {
      isInitialMountResources.current = false;
      return;
    }
    saveResources(resources);
  }, [resources]);

  // Save pages when they change
  useEffect(() => {
    if (isInitialMountPages.current) {
      isInitialMountPages.current = false;
      return;
    }
    savePages(pages);
  }, [pages]);

  // Resource management
  const handleAddResource = (resourceData) => {
    const newResource = {
      ...resourceData,
      id: Date.now(),
      pageId: currentView === 'home' ? pages[0]?.id : currentView
    };
    setResources([...resources, newResource]);
  };

  const handleEditResource = (id, resourceData) => {
    setResources(resources.map((r) => (r.id === id ? { ...resourceData, id, pageId: r.pageId } : r)));
  };

  const handleDeleteResource = (id) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  // Page management
  const handleAddPage = (pageData) => {
    const newPage = {
      ...pageData,
      id: Date.now(),
    };
    setPages([...pages, newPage]);
  };

  const handleEditPage = (id, pageData) => {
    setPages(pages.map((p) => (p.id === id ? { ...pageData, id } : p)));
  };

  const handleDeletePage = (pageId) => {
    // Move resources from deleted page to first page
    const firstPageId = pages[0].id;
    setResources(resources.map((r) =>
      r.pageId === pageId ? { ...r, pageId: firstPageId } : r
    ));
    setPages(pages.filter((p) => p.id !== pageId));
    setCurrentView('home');
  };

  const handleSelectPage = (pageId) => {
    setCurrentView(pageId);
  };

  const handleGoHome = () => {
    setCurrentView('home');
  };

  // Import/Export
  const handleExport = () => {
    exportData(resources, pages);
  };

  const handleImport = async (file) => {
    try {
      const imported = await importData(file);
      const resourceCount = imported.resources?.length || 0;
      const pageCount = imported.pages?.length || 0;

      if (confirm(`Import ${resourceCount} resources and ${pageCount} pages? This will replace your current data.`)) {
        setResources(imported.resources);
        setPages(imported.pages);
      }
    } catch (error) {
      console.error('[App] Import error:', error);
      alert('Error importing file: ' + error.message);
    }
  };

  // Get resources for current page
  const currentPageResources = currentView === 'home'
    ? []
    : resources.filter((r) => r.pageId === currentView);

  // Get current page data
  const currentPage = pages.find((p) => p.id === currentView);

  return (
    <VolumeProvider>
      <div className="app">
        {currentView === 'home' ? (
          <HomePage
            pages={pages}
            onSelectPage={handleSelectPage}
            onAddPage={handleAddPage}
            onEditPage={handleEditPage}
            onDeletePage={handleDeletePage}
            onImport={handleImport}
            onExport={handleExport}
          />
        ) : (
          <>
            <ResourcePanel
              resources={currentPageResources}
              onAddResource={handleAddResource}
              onEditResource={handleEditResource}
              onDeleteResource={handleDeleteResource}
            />
            <div className="main-content">
              <VolumeControl />
              <TileGrid resources={currentPageResources} />
              <PageNavigation
                pages={pages}
                currentPageId={currentView}
                onSelectPage={handleSelectPage}
                onGoHome={handleGoHome}
              />
            </div>
          </>
        )}
      </div>
    </VolumeProvider>
  );
}

export default App;
