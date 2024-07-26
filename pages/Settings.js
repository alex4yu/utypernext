import React, { useEffect, useState } from "react";
import styles from '../styles/settings.module.css';


export default function Settings(){
    const [liveWPM, setLiveWPM] = useState('ON');
    const [liveAccuracy, setLiveAccuracy] = useState('OFF');
    const [trueTyping, setTrueTyping] = useState('OFF');
    const [noError, setNoError] = useState('OFF');
    const [noBackspace, setNoBackspace] = useState('OFF');

    const toggleSetting = (setting) =>{
        if(setting === "liveWPM"){
            setLiveWPM(liveWPM === 'ON' ? 'OFF': 'ON')
        }
        else if(setting === "liveAccuracy"){
            setLiveAccuracy(liveAccuracy === 'ON' ? 'OFF': 'ON')
        }
        else if(setting === "trueTyping"){
            setTrueTyping(trueTyping === 'ON' ? 'OFF': 'ON')
        }
        else if(setting === "noError"){
            setNoError(noError === 'ON' ? 'OFF': 'ON')
        }
        else if(setting === "noBackspace"){
            setNoBackspace(noBackspace === 'ON' ? 'OFF': 'ON')
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
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('noError')}>{noError}</div>
                    <div className = {styles.settingButton} onClick={()=>toggleSetting('noBackspace')}>{noBackspace}</div>
                </div>
            </div>
                

           
        </div>
        
        
            
        )
}