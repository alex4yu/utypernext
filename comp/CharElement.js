import { useContext } from "react";
import SettingsContext from "../code/settingsContext";
import styles from '../styles/index.module.css';

function CharElement({letterObj, cursorPosition}){
    const { settings } = useContext(SettingsContext);

    let displayCharacter = letterObj.char;
    let status = letterObj.status;
    let displayColor = "";
    let cursorColor = settings.bgColor;
    if(letterObj.id === cursorPosition){
        cursorColor = settings.titleColor;
    }
    if(letterObj.char === " "){
        displayCharacter = "_";
    }
    
    if(status === "yes"){
        displayColor = settings.titleColor;
        if(letterObj.char === " "){
            displayColor = settings.bgColor;
        }
    }
    else if(status === "no"){
        displayColor = "red";
    }
    else if(status === "new"){
        displayColor = settings.preTextColor;
        if(letterObj.char === " "){
            displayColor = settings.bgColor;
        }
    }
    
    
    

    return(
        <div style ={{display: 'flex'}}>
            <div style ={{
                width: "1px",
                height: "22px",
                display: "flex",
                justifyContent: 'center',
                backgroundColor: cursorColor,
                
            }}>

            </div>
            <div className={styles.characterElement} style = {{color: displayColor}}>
                {displayCharacter}
            </div>
        </div>
        
    )

}


export default CharElement;