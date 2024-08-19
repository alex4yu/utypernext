import { createContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    liveWPM: 'OFF',
    liveAccuracy: 'OFF',
    trueTyping: 'OFF',
    noErrors: 'OFF',
    noBackspace: 'OFF',
    theme: 'blueRoyal',
    bgColor: '#001d3d',
    titleColor: '#ffc300',
    preTextColor: '#516c8a',
    bgLightColor: '#002752',
    wrongColor: 'red'
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
