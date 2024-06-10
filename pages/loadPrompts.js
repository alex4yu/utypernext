import * as fs from 'fs';
 

const loadLetters = (words) =>{
    //console.log("loading letters");
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let wordList = "";
    for(let i = 1; i <= words; i++ ){
        let wordLength = Math.floor(Math.random()*5)+2;
        for (let i = 1; i <= wordLength; i++){
            let characterChosen = alphabet.charAt(Math.floor(Math.random()*26));
            wordList = wordList + characterChosen
        }
        wordList = wordList + " ";
    }
    wordList = wordList.substring(0,wordList.length-1);  
    return wordList;
};

const loadWords = async (words) =>{
    


    var wordList;
    for(let i = 1; i <= words; i++ )
    {
        var fileRandom = Math.floor(Math.random()*100);
        var word;
        if (fileRandom > 40){
            //alert("t100");
            word = t100Array[Math.floor(Math.random()*t100Array.length)];
        }
        else if (fileRandom > 15){
            //alert("super common");
            word = superCommonArray[Math.floor(Math.random()*superCommonArray.length)];
        }
        else{
            //alert("common");
            word = commonArray[Math.floor(Math.random()*commonArray.length)];
        }
        
        wordList = wordList + word + " ";
    }
    alert(wordList)
    wordList = wordList.substring(0,wordList.length-1);  
    return wordList;
}

module.exports = {
    loadLetters,
    loadWords
}