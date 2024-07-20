
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
  
  // trackers
  const [seconds, setSeconds] = useState(0);

  // modes and status
  const [focused, setFocused] = useState(true);
  const [typingMode, setTypingMode] = useState('words');
  const [typing, setTyping] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  // action booleans
  const [newPrompt, setNewPrompt] = useState(true);

  // info and data
  const [startTime, setStartTime] = useState(0);
  const [totalWordLength, setTotalWordLength] = useState(10);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [totalTime, setTotaltime] = useState(0);
  
  /*
  useEffect(() => {
    alert('wordContainers before map:'+ JSON.stringify(wordContainers));
  }, [wordContainers]);
  */

  //updates timer
  useEffect(() => {
    let timer;
    if (typing) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [typing]);


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
          // if no character typed, no backspace happens
          if(characterCount != 0){
            const updatedLetters = [...letters];
            updatedLetters[index - 1].status = "new";
            setLetters(updatedLetters);
            setCharacterCount(prevCount => prevCount - 1);
            setTypedText(typedText.substring(0,typedText.length - 1));
          }
          
        }
        else if (char === "Enter"){
          // if user hits Enter key, ends test
          setTyping(false);
          setDisplayInfo(!displayInfo);
          if(!displayInfo){
            finishTest();
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
          //console.log(characterCount+1);
          setTypedText(typedText + char);
          if(characterCount + 1 === promptText.length){
            setTyping(false);
            setDisplayInfo(!displayInfo);
            finishTest();
          }
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
      //alert(typingMode);
      setWordContainers([])
      setLetters([]);
      setCharacterCount(0);
      setTypedText("");
      setStartTime(0);
      setSeconds(0);
      setFirstTryCorrectCount(0);
      setFirstTryCorrectArr([]);
      var wordList = "";
      var charArr = [];
      var wordsArr = [];
      if(typingMode === 'words'){
        wordList = await loadWords(totalWordLength);
      }
      else{
        wordList = await loadLetters(totalWordLength);
      }
      
      //alert(wordList);
      var wordStart = 0;
      var wordId = 0;
      setPromptText(wordList);
      for(let i = 0; i < wordList.length; i++){
        let charData = {id: i, char: wordList.charAt(i), status: "new"};
        charArr.push(charData);
        if(wordList.charAt(i) === " "){
          let wordData = {id: wordId, start: wordStart, end: i};
          wordStart = i+1;
          wordId++;
          wordsArr.push(wordData);
        
        }
        if(i === wordList.length - 1){
          let wordData = {id: wordId, start: wordStart, end: i};
          wordsArr.push(wordData);
        }
        
      }  
      setWordContainers(wordsArr);
      setLetters(charArr);
      
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      }
    }
    generate();
    
  }, [newPrompt]);

  //when the test finishes process test and display results
  const finishTest = () =>{
    var timeTaken = (Date.now() - startTime)/1000;
    var correctWords = checkWords();
    var wpm = Math.floor(correctWords/timeTaken*60.0);
    //alert(firstTryCorrectCount);
    var accuracy = Math.floor(firstTryCorrectCount/characterCount*10000)/100.0
    document.removeEventListener('click', handleClick);
    setTotaltime(timeTaken);
    setWpm(wpm);
    setAccuracy(accuracy);
  }

  const setPrompt = () =>{
    setNewPrompt(!newPrompt);
    setDisplayInfo(false);
  };
  
  const handleClick = (event) => {
    if(document.getElementById("prompt") === null){
      return ;
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

  const setMode = (mode) =>{
    //alert('clicked');
    setTypingMode(mode);
    setPrompt();
  }
  const setWordCount = (num) =>{
    //alert(' word count change clicked');
    setTotalWordLength(num);
    setPrompt();
  }
  
  return (
    <div>{displayInfo? (
      <div>{/*Results display*/}
        <div>WPM: {wpm}</div>
        <div>Acurracy: {accuracy}%</div>
        <div>Total Time: {totalTime}</div>
        
        <div className = {styles.generate} onClick={setPrompt}>Next Prompt</div>
      </div>
    ) : (
      <div>{/*Main typing display*/}
        <div className = {styles.promptTrackerParent}>
          <div className = {styles.settingCatagoryContainer}>
            <div className = {styles.modeCategory} >Typing Mode</div>
            <div className = {styles.countCategory}>Word Count</div>
          </div>
          <div className = {styles.typeSettingsButtons}>
            <div className = {styles.modeButton} onClick={() => setMode('words')}>Words</div>
            <div className = {styles.modeButton} onClick={() => setMode('letters')}>Letters</div>
            <div className = {styles.countButton} onClick={() => setWordCount(10)}>10</div>
            <div className = {styles.countButton} onClick={() => setWordCount(20)}>20</div>
            <div className = {styles.countButton} onClick={() => setWordCount(40)}>40</div>
          </div>
          <div className = {styles.trackerParent} >
            {typing && <div className = {styles.tracker} id = "timer">{seconds}</div>}
            <div className = {styles.tracker} id = "wpm"></div>
            <div className = {styles.tracker} id = "accuracy"></div>
          </div>
          <div className = {styles.prompt} id = "prompt">
            {wordContainers.map(word => (
              <WordContainer
                  key={word.id}
                  wordObj={word} 
                  letters = {letters}
                  cursorPos = {characterCount}
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