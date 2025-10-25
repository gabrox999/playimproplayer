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
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Handle old format (just resources array)
        if (Array.isArray(data)) {
          resolve({
            resources: data,
            pages: [{
              id: 1,
              name: 'Page 1',
              icon: '🎵',
              color: '#3b82f6'
            }]
          });
        } else {
          // New format with pages
          resolve({
            resources: data.resources || [],
            pages: data.pages || [{
              id: 1,
              name: 'Page 1',
              icon: '🎵',
              color: '#3b82f6'
            }]
          });
        }
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

// Legacy export for backwards compatibility
export const exportResources = exportData;
export const importResources = importData;
