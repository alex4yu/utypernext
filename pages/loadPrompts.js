
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


module.exports = {
    loadLetters,
}