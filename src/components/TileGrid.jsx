import ResourceTile from './ResourceTile';
import './TileGrid.css';

const TileGrid = ({ resources }) => {
  return (
    <div className="tile-grid-container">
      {resources.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <h3>No music resources yet</h3>
          <p>Add your first music resource using the panel on the left</p>
        </div>
      ) : (
        <div className="tile-grid">
          {resources.map((resource) => (
            <ResourceTile key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TileGrid;
