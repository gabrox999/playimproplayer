import { useVolume } from '../contexts/VolumeContext';
import './VolumeControl.css';

const VolumeControl = () => {
  const { masterVolume, updateMasterVolume } = useVolume();

  return (
    <div className="volume-control">
      <span className="volume-icon">🔊</span>
      <input
        type="range"
        min="0"
        max="100"
        value={masterVolume}
        onChange={(e) => updateMasterVolume(Number(e.target.value))}
        className="volume-slider"
      />
      <span className="volume-value">{masterVolume}%</span>
    </div>
  );
};

export default VolumeControl;
