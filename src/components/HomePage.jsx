import { useState } from 'react';
import { PRESET_ICONS, PRESET_COLORS } from './constants';
import './HomePage.css';

const HomePage = ({ pages, onSelectPage, onAddPage, onEditPage, onDeletePage, onImport, onExport }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '🎵',
    color: '#3b82f6'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      onEditPage(editingId, formData);
      setEditingId(null);
    } else {
      onAddPage(formData);
      setIsAdding(false);
    }

    setFormData({ name: '', icon: '🎵', color: '#3b82f6' });
  };

  const handleEdit = (page) => {
    setFormData({ name: page.name, icon: page.icon, color: page.color });
    setEditingId(page.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', icon: '🎵', color: '#3b82f6' });
  };

  const handleDelete = (pageId) => {
    if (pages.length === 1) {
      alert('Cannot delete the last page!');
      return;
    }
    if (confirm('Delete this page? All resources in it will be moved to Page 1.')) {
      onDeletePage(pageId);
    }
  };

  const handleImportClick = () => {
    console.log('[Import] Opening file picker...');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log('[Import] File selected:', file ? { name: file.name, size: file.size, type: file.type } : 'No file');
      if (file) {
        console.log('[Import] Calling onImport with file...');
        onImport(file);
      } else {
        console.warn('[Import] No file was selected');
      }
    };
    input.click();
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-header-top">
          <h1>Play Impro Player</h1>
          <div className="home-header-actions">
            <button onClick={handleImportClick} className="btn-import" title="Import all data">
              📤 Import
            </button>
            <button onClick={onExport} className="btn-export" title="Export all data">
              📥 Export
            </button>
          </div>
        </div>
        <p>Select a page to manage your music resources</p>
      </div>

      <div className="pages-grid">
        {pages.map((page) => (
          <div key={page.id} className="page-card">
            <div
              className="page-card-inner"
              style={{
                background: `linear-gradient(135deg, ${page.color}dd, ${page.color}55)`
              }}
              onClick={() => onSelectPage(page.id)}
            >
              <div className="page-card-icon">{page.icon}</div>
              <h3 className="page-card-title">{page.name}</h3>
            </div>
            <div className="page-card-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(page);
                }}
                className="btn-edit"
              >
                ✏️
              </button>
              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(page.id);
                  }}
                  className="btn-delete"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="page-card page-card-add" onClick={() => setIsAdding(true)}>
          <div className="add-icon">+</div>
          <p>Add New Page</p>
        </div>
      </div>

      {isAdding && (
        <div className="page-modal-overlay" onClick={handleCancel}>
          <div className="page-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId !== null ? 'Edit Page' : 'New Page'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Page Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                autoFocus
              />

              <div className="form-section">
                <label>Icon</label>
                <div className="icon-selector">
                  {PRESET_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label>Color</label>
                <div className="color-selector">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                      title={color}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  className="color-picker"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  title="Custom color"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  {editingId !== null ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
