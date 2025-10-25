const STORAGE_KEY = 'music-resources';
const PAGES_KEY = 'music-pages';

// Resources
export const loadResources = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading resources:', error);
    return [];
  }
};

export const saveResources = (resources) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch (error) {
    console.error('Error saving resources:', error);
  }
};

// Pages
export const loadPages = () => {
  try {
    const stored = localStorage.getItem(PAGES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Default page if none exist
    return [{
      id: 1,
      name: 'Page 1',
      icon: '🎵',
      color: '#3b82f6'
    }];
  } catch (error) {
    console.error('Error loading pages:', error);
    return [{
      id: 1,
      name: 'Page 1',
      icon: '🎵',
      color: '#3b82f6'
    }];
  }
};

export const savePages = (pages) => {
  try {
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
  } catch (error) {
    console.error('Error saving pages:', error);
  }
};

// Import/Export
export const exportData = (resources, pages) => {
  const data = {
    resources,
    pages,
    version: '1.0'
  };
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'music-dashboard.json';
  link.click();
  URL.revokeObjectURL(url);
};

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    console.log('[Storage] importData called with file:', { name: file.name, size: file.size, type: file.type });

    const reader = new FileReader();

    reader.onload = (e) => {
      console.log('[Storage] File read complete, parsing JSON...');
      try {
        const data = JSON.parse(e.target.result);
        console.log('[Storage] JSON parsed successfully:', data);

        // Handle old format (just resources array)
        if (Array.isArray(data)) {
          console.log('[Storage] Detected old format (array of resources)');
          const pages = [{
            id: 1,
            name: 'Page 1',
            icon: '🎵',
            color: '#3b82f6'
          }];
          // Assign all resources to first page
          const resources = data.map(r => ({
            ...r,
            pageId: r.pageId || 1
          }));
          console.log('[Storage] Converted to new format:', { resources: resources.length, pages: pages.length });
          resolve({ resources, pages });
        } else {
          // New format with pages
          console.log('[Storage] Detected new format (with pages)');
          const pages = data.pages || [{
            id: 1,
            name: 'Page 1',
            icon: '🎵',
            color: '#3b82f6'
          }];
          const firstPageId = pages[0]?.id || 1;

          // Assign resources without pageId to first page
          const resources = (data.resources || []).map(r => ({
            ...r,
            pageId: r.pageId !== undefined ? r.pageId : firstPageId
          }));

          console.log('[Storage] Processed data:', { resources: resources.length, pages: pages.length });
          resolve({ resources, pages });
        }
      } catch (error) {
        console.error('[Storage] JSON parse error:', error);
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = (error) => {
      console.error('[Storage] FileReader error:', error);
      reject(new Error('Error reading file'));
    };

    console.log('[Storage] Starting to read file...');
    reader.readAsText(file);
  });
};

// Legacy export for backwards compatibility
export const exportResources = exportData;
export const importResources = importData;
