import React, { useEffect, useState } from "react";
import styles from '../styles/settings.module.css';


export default function Settings(){
    const [liveWPM, setLiveWPM] = useState('ON');
    const [liveAccuracy, setLiveAccuracy] = useState('OFF');
    const [trueTyping, setTrueTyping] = useState('OFF');
    const [noError, setNoError] = useState('OFF');
    const [noBackspace, setNoBackspace] = useState('OFF');

    return(
        <div>
            <div className = {styles.settingSection} >Display</div>
                <div className = {styles.settingContainer}>
                    <div className = {styles.specificSetting}>Live WPM</div>
                    <div className = {styles.settingButton}></div>
                </div>
                <div id = "livePercentDiv" className = {styles.settingContainer}>
                    <div className = {styles.specificSetting} id = "livePercent">Live Accuracy</div>
                    <div className = {styles.settingButton}></div>
                </div>
                <div id = "trueTypingDiv" className = {styles.settingContainer}>
                    <div className = {styles.specificSetting} id = "trueTyping">Show True Typing</div>
                    <div className = {styles.settingButton}></div>
                </div>
            <div className = {styles.settingSection} id = "testDiv">Test Settings</div>
                <div id = "noErrorDiv" className = {styles.settingContainer}>
                    <div className = {styles.specificSetting} id = "noError">No Errors</div>
                    <div className = {styles.settingButton}></div>
                </div>
                <div id = "noBackspaceDiv" className = {styles.settingContainer}>
                    <div className = {styles.specificSetting} id = "noBackspace">No Backspace</div>
                    <div className = {styles.settingButton}></div>
                    
                </div>
        </div>
        
        
            
        )
}