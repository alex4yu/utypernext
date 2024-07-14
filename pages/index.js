
import React, { useEffect, useState } from "react";
import styles from '../styles/index.module.css';
import WordContainer from "../comp/WordContainer";

const {loadLetters, loadWords} = require("./loadPrompts");

export default function Home() {
  // words and characters
  const [promptText, setPromptText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [letters, setLetters] = useState([]);
  const [wordContainers, setWordContainers] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);
  const [firstTryCorrectArr, setFirstTryCorrectArr] = useState([]);
  
  // modes and status
  const [focused, setFocused] = useState(true);
  const [typing, setTyping] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  // action booleans
  const [newPrompt, setNewPrompt] = useState(true);

  // info and data
  const [startTime, setStartTime] = useState(0);
  const [totalWordLength, setTotalWordLength] = useState(40);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [totalTime, setTotaltime] = useState(0);
  
  
  // handles key inputs, if focused updates information to match user key types. 
  useEffect(() => {
    const handleKeyPress = (event) => {
      if(!typing){
        setStartTime(Date.now());
        setTyping(true);
      }
      if(focused){
        const char = event.key;
        const index = characterCount;
        if (char === "Backspace"){
          // if user hits Backspace key, removes last character typed
          const updatedLetters = [...letters];
          updatedLetters[index - 1].status = "new";
          setLetters(updatedLetters);
          setCharacterCount(prevCount => prevCount - 1);
          setTypedText(typedText.substring(0,typedText.length - 1))
        }
        else if (char === "Enter"){
          // if user hits Enter key, ends test
          setTyping(false);
          setDisplayInfo(!displayInfo);
          if(!displayInfo){
            var timeTaken = (Date.now() - startTime)/1000;
            var correctWords = checkWords()
            var wpm = Math.floor(correctWords/timeTaken*60.0);
            //alert(firstTryCorrectCount);
            var accuracy = Math.floor(firstTryCorrectCount/characterCount*10000)/100.0
            document.removeEventListener('click', handleClick);
            setTotaltime(timeTaken);
            setWpm(wpm);
            setAccuracy(accuracy);
          }
          else{
            //generate and display next prompt by changing dependency array
            setNewPrompt(!newPrompt);
          }
          
        }
        else if (index < letters.length && char.length === 1) {
          // if user has not overtyped prompt, and entered character is a single character, updates typed prompt. 
          const currentLetter = letters[index].char;
          const status = char === currentLetter ? "yes" : "no";
          if(firstTryCorrectArr.length < characterCount){
            var updatedFirstTryCorrectArr = firstTryCorrectArr;
            if(status === "yes"){
              updatedFirstTryCorrectArr.push(true);
              setFirstTryCorrectArr(updatedFirstTryCorrectArr);
              setFirstTryCorrectCount(firstTryCorrectCount + 1);
            }
            else{
              updatedFirstTryCorrectArr.push(true);
              setFirstTryCorrectArr(updatedFirstTryCorrectArr);
              
            }
          }
          const updatedLetters = [...letters];
          updatedLetters[index].status = status;
          setLetters(updatedLetters);
          setCharacterCount(prevCount => prevCount + 1);
          setTypedText(typedText + char);
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
  }, [letters, characterCount, focused, typing, startTime]);

  //creates and displays prompts on first render and future new prompt requests
  useEffect(() => {
    const generate = async () => {
      setLetters([]);
      setCharacterCount(0);
      setTypedText("");
      setStartTime(0);
      setFirstTryCorrectCount(0);
      setFirstTryCorrectArr([])
      var wordList;
      var charArr = [];
      var wordsArr = [];
      wordList = await loadWords(totalWordLength)
      alert(wordList);
      var wordStart = 0;
      var wordId = 0;
      setPromptText(wordList);
      for(let i = 0; i < wordList.length; i++){
        let charData = {id: i, char: wordList.charAt(i), status: "new"}
        charArr.push(charData);
        if(wordList.charAt(i) === " "){
          let wordData = {id: wordId, start: wordStart, end: i}
          wordStart = i+1;
          wordId++;
          wordsArr.push(wordData);
          

        }
      }  
      
      setWordContainers(wordsArr)
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
    setDisplayInfo(false);
  };
  
  const handleClick = (event) => {
    if(document.getElementById("prompt") === null){
      return 
    }
    else if (document.getElementById("prompt").contains(event.target)) {
      setFocused(true);
    } else {
      setFocused(false);

    }
  };

  const checkWords = () => {
    var promptArr = promptText.split(" ");
    var typedArr = typedText.split(" ");
    var wordsCorrect = 0;
    for (let i = 0; i < promptArr.length; i++)
    {
        if (typedArr != null && promptArr[i] === typedArr[i])
        { wordsCorrect++;  }
    }
    return wordsCorrect;
  }


  return (
    <div>{displayInfo? (
      <div>
        <div>WPM: {wpm}</div>
        <div>Acurracy: {accuracy}%</div>
        <div>Total Time: {totalTime}</div>
        <div>DisplayInfo var: {"" + displayInfo}</div>
        <div className = {styles.generate} onClick={setPrompt}>Next Prompt</div>
      </div>
    ) : (
      <div>
        <div className = {styles.promptTrackerParent}>
        <div className = {styles.trackerParent} >
            <div className = {styles.tracker} id = "timer"></div>
            <div className = {styles.tracker} id = "wpm"></div>
            <div className = {styles.tracker} id = "accuracy"></div>
        </div>
        <div className = {styles.prompt} id = "prompt">
          {wordContainers.map(word => (
            <WordContainer
                key={word.id}
                wordObj={word} 
                letters = {letters}
            />
            ))
          }
        </div>
      </div>
      <div id="next" className = {styles.next}>{'>'}</div> 
      <div className = {styles.generate} onClick={setPrompt}> generate </div>
      </div>
    )}
    </div>
  ) 
}