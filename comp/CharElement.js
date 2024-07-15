

import styles from '../styles/index.module.css';

function CharElement({letterObj, cursorPosition}){
    let displayCharacter = letterObj.char;
    let status = letterObj.status;
    let displayColor = "";
    let cursorColor = "#001d3d";
    if(letterObj.id === cursorPosition){
        cursorColor = "white";
    }
    if(letterObj.char === " "){
        displayCharacter = "_";
    }
    
    if(status === "yes"){
        displayColor = "#ffc300";
        if(letterObj.char === " "){
            displayColor = '#001d3d';
        }
    }
    else if(status === "no"){
        displayColor = "red";
    }
    else if(status === "new"){
        displayColor = "#516c8a";
        if(letterObj.char === " "){
            displayColor = "#001d3d";
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