import { useState, useEffect } from "react";

function CharElement({letterObj}){
    let displayCharacter = letterObj.char;
    let status = letterObj.status;
    let displayColor = "white";

    
    if(status === "pre"){
        displayColor = "white";
        if(letterObj.char === " "){
            displayCharacter = "_";
            displayColor = '#001d3d';
        }
    }
    else if(status === "yes"){
        displayColor = "green";
        if(letterObj.char === " "){
            displayCharacter = "_";
            displayColor = '#001d3d';
        }
    }
    else if(status === "no"){
        displayColor = "red";
    }
    

    
    

    return(
        <div style = {{
            color: displayColor, 
            display: "inline-block",
            fontSize: "20px",
            height: "20px",
            fontFamily: "Roboto Mono, monospace",
            verticalAlign: "top"
            }}>
            {displayCharacter}
        </div>
    )

}


export default CharElement;