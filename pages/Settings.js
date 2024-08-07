import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/settings.module.css';
import SettingsContext from "./settingsContext";

export default function Settings(){
    const { settings, updateSettings } = useContext(SettingsContext);

    const [liveWPM, setLiveWPM] = useState(settings.liveWPM);
    const [liveAccuracy, setLiveAccuracy] = useState(settings.liveAccuracy);
    const [trueTyping, setTrueTyping] = useState(settings.trueTyping);
    const [noErrors, setNoError] = useState(settings.noErrors);
    const [noBackspace, setNoBackspace] = useState(settings.noBackspace);

    
    const handleSave = () => {
        updateSettings({ theme: newTheme, language: newLanguage });
    };
    

    const newSettingValue = (curVal) =>{
        return curVal === 'ON' ? 'OFF': 'ON';
    }
    const toggleSetting = (setting) =>{
        if(setting === "liveWPM"){
            const newVal = newSettingValue(liveWPM);
            setLiveWPM(newVal);
            updateSettings({ ['liveWPM']: newVal});
        }
        else if(setting === "liveAccuracy"){
            const newVal = newSettingValue(liveAccuracy);
            setLiveAccuracy(newVal);
            updateSettings({ ['liveAccuracy']: newVal});
        }
        else if(setting === "trueTyping"){
            const newVal = newSettingValue(trueTyping);
            setTrueTyping(newVal);
            updateSettings({ ['trueTyping']: newVal});
        }
        else if(setting === "noErrors"){
            const newVal = newSettingValue(noErrors);
            setNoError(newVal);
            updateSettings({ ['noErrors']: newVal });
        }
        else if(setting === "noBackspace"){
            const newVal = newSettingValue(noBackspace);
            setNoBackspace(newVal);
            updateSettings({ ['noBackspace']: newVal});
        }
        
    }

    
    return(
        <div>
            <div className = {styles.settingSection}>Display</div>
            <div className = {styles.sectionContainer}>
                <div className = {styles.labelContainer}>
                    <div className = {styles.label}>
                        <div className = {styles.labelName}>Live WPM</div>
                        <div className = {styles.labelDescription}>Displays cumulative words per minute during the test </div>
                    </div>
                    <div className = {styles.label}>
                        <div className = {styles.labelName}>Live Accuracy</div>
                        <div className = {styles.labelDescription}>Displays overall typing accuracy during the test </div>
                    </div>
                    <div className = {styles.label}>
                        <div className = {styles.labelName}>True Typing</div>
                        <div className = {styles.labelDescription}>Displays actual typed characters rather than prompt during the test </div>
                    </div>
                    
                </div>
                <div className = {styles.buttonsContainer}>
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('liveWPM')}>{liveWPM}</div>
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('liveAccuracy')}>{liveAccuracy}</div>
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('trueTyping')}>{trueTyping}</div>
                </div>
            </div>

            <div className = {styles.settingSection}>Typing Settings</div>
            <div className = {styles.sectionContainer}>
                <div className = {styles.labelContainer}>
                    <div className = {styles.label}>
                        <div className = {styles.labelName}>No Errors</div>
                        <div className = {styles.labelDescription}>Test ends on first mistake</div>
                    </div>
                    <div className = {styles.label}>
                        <div className = {styles.labelName}>No Backspace</div>
                        <div className = {styles.labelDescription}>Unable to use backspace in tests</div>
                    </div>
                </div>
                <div className = {styles.buttonsContainer}>
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('noErrors')}>{noErrors}</div>
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('noBackspace')}>{noBackspace}</div>
                </div>
            </div>
                

           
        </div>
        
        
            
        )
}