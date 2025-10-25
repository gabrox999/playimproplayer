import { useState } from 'react';
import { getPlayerType } from '../utils/urlConverter';
import { PRESET_ICONS, PRESET_COLORS } from './constants';
import './ResourcePanel.css';

const ResourcePanel = ({ resources, onAddResource, onEditResource, onDeleteResource }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    color: '#3b82f6',
    icon: '🎵'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      onEditResource(editingId, formData);
      setEditingId(null);
    } else {
      onAddResource(formData);
      setIsAdding(false);
    }

    setFormData({ title: '', url: '', color: '#3b82f6', icon: '🎵' });
  };

  const handleEdit = (resource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', url: '', color: '#3b82f6', icon: '🎵' });
  };

  return (
    <div className="resource-panel">
      <div className="panel-header">
        <h2>Music Resources</h2>
        <div className="header-actions">
          <button onClick={() => setIsAdding(true)} className="btn-add" disabled={isAdding}>
            + Add
          </button>
        </div>
      </div>

      {isAdding && (
        <form className="resource-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
          {formData.url && getPlayerType(formData.url).startsWith('local-') && (
            <div className="local-file-warning">
              <span className="warning-icon">⚠️</span>
              <div className="warning-text">
                <strong>Local File Detected</strong>
                <p>This file will only work on this device. It won't be accessible from other devices.</p>
              </div>
            </div>
          )}

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

          <div className="form-actions">
            <button type="submit" className="btn-save">
              {editingId !== null ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="resource-list">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="resource-item"
            style={{ borderLeftColor: resource.color }}
          >
            <div className="resource-info">
              <span className="resource-icon">{resource.icon}</span>
              <div className="resource-details">
                <h3>{resource.title}</h3>
                <p>{new URL(resource.url).hostname}</p>
              </div>
            </div>
            <div className="resource-actions">
              <button onClick={() => handleEdit(resource)} className="btn-icon-small">
                ✏️
              </button>
              <button onClick={() => onDeleteResource(resource.id)} className="btn-icon-small">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePanel;
