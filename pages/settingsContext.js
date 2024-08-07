import { createContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    liveWPM: 'OFF',
    liveAccuracy: 'OFF',
    trueTyping: 'OFF',
    noErrors: 'OFF',
    noBackspace: 'OFF'
  });

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
