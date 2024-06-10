
import React, { useEffect, useState } from "react";
import styles from '../styles/index.module.css';
import CharElement from "../comp/CharElement";

const {loadLetters} = require("./loadPrompts");

export default function Home() {
  const [letters, setLetters] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [focused, setFocused] = useState(true);
  const [newPrompt, setNewPrompt] = useState(true);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if(focused){
        const char = event.key;
        const index = characterCount;
        if (char === "Backspace"){
          const updatedLetters = [...letters];
          updatedLetters[index - 1].status = "new";
          setLetters(updatedLetters);

          setCharacterCount(prevCount => prevCount - 1);
        }
        else if (index < letters.length) {
          const currentLetter = letters[index].char;
          const status = char === currentLetter ? "yes" : "no";
          
          const updatedLetters = [...letters];
          updatedLetters[index].status = status;
          setLetters(updatedLetters);

          setCharacterCount(prevCount => prevCount + 1);
        }
      }
      else{
        console.log("not focused");
      }
      
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [letters, characterCount, focused]);
  
  useEffect(() => {
    const generate = () => {
      setLetters([]);
      setCharacterCount(0);
      let charArr = loadLetters();
      setLetters(charArr);
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      }
    }
    generate();
    
  }, [newPrompt]);

  const setPrompt = () =>{
    setNewPrompt(!newPrompt);
  };
  
  const handleClick = (event) => {
    if (document.getElementById("prompt").contains(event.target)) {
      setFocused(true);
    } else {
      setFocused(false);

    }
  };

  return (
    <>
    <div className = {styles.promptTrackerParent}>
      <div className = {styles.trackerParent} >
          <div className = {styles.tracker} id = "timer"></div>
          <div className = {styles.tracker} id = "wpm"></div>
          <div className = {styles.tracker} id = "accuracy"></div>
      </div>
      <div className = {styles.prompt} id = "prompt">
        {letters.map(letter => (
          <CharElement
              key={letter.id}
              letterObj={letter} 
          />
          ))
        }
      </div>
    </div>
    <div id="next" className = {styles.next}>{'>'}</div> 
    <div className = {styles.generate} onClick={setPrompt}> generate </div>
    </>
  ) 
}