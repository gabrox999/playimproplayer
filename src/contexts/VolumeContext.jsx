import { createContext, useContext, useState } from 'react';

const VolumeContext = createContext();

export const useVolume = () => {
  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error('useVolume must be used within VolumeProvider');
  }
  return context;
};

export const VolumeProvider = ({ children }) => {
  const [masterVolume, setMasterVolume] = useState(100);
  const [players, setPlayers] = useState({});

  const registerPlayer = (id, player) => {
    setPlayers((prev) => ({ ...prev, [id]: player }));
  };

  const unregisterPlayer = (id) => {
    setPlayers((prev) => {
      const newPlayers = { ...prev };
      delete newPlayers[id];
      return newPlayers;
    });
  };

  const updateMasterVolume = (volume) => {
    setMasterVolume(volume);
    // Update all registered YouTube players
    Object.values(players).forEach((player) => {
      if (player && typeof player.setVolume === 'function') {
        player.setVolume(volume);
      }
    });
  };

  return (
    <VolumeContext.Provider
      value={{
        masterVolume,
        updateMasterVolume,
        registerPlayer,
        unregisterPlayer,
      }}
    >
      {children}
    </VolumeContext.Provider>
  );
};
