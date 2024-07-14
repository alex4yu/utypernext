
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
    //console.log("loading words");
    var t100Txt;
    var superCommonTxt;
    var commonTxt;
    await fetch('/api/readFile?fileName=t100Common.txt')
        .then((response) => response.json())
        .then((data) => t100Txt = data.content);
    await fetch('/api/readFile?fileName=supercommon.txt')
        .then((response) => response.json())
        .then((data) => superCommonTxt = data.content);
    await fetch('/api/readFile?fileName=common.txt')
        .then((response) => response.json())
        .then((data) => commonTxt = data.content);
    //alert('t100: '+t100Txt);
    
    var wordList = "";
    var t100Array = t100Txt.split(/\r?\n/);
    //alert(t100Array);
    var superCommonArray = superCommonTxt.split(/\r?\n/);
    var commonArray = commonTxt.split(/\r?\n/);

    for(let i = 1; i <= words; i++ )
    {
        var fileRandom = Math.floor(Math.random()*100);
        var word;
        if (fileRandom > 50){
            //alert("t100");
            word = t100Array[Math.floor(Math.random()*t100Array.length)];
        }
        else if (fileRandom > 5){
            //alert("super common");
            word = superCommonArray[Math.floor(Math.random()*superCommonArray.length)];
        }
        else{
            //alert("common");
            word = commonArray[Math.floor(Math.random()*commonArray.length)];
        }
        
        wordList = wordList + word + " ";
    }
    wordList = wordList.substring(0,wordList.length-1);  
    //alert(wordList);
    return wordList;
};

const fetchFileContent = () => {
    if (selectedFile) {
      fetch('/api/readFile?fileName=${fileName}')
        .then((response) => response.json())
        .then((data) => setContent(data.content));
    }
  };

module.exports = {
    loadLetters,
    loadWords
}