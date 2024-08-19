
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

const readFile = async (fileName) =>{
    try {
        const response = await fetch(fileName); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text(); // Fetches the content as text

        return text
    } catch (error) {
        console.error('Error loading text file:' + fileName, error);
    }
    
}
const loadWords = async (words) =>{
    //console.log("loading words");
    let en100Txt = await readFile('/textFiles/en100.txt');
    let en1kTxt = await readFile('/textFiles/en1k.txt');
    let en10kTxt = await readFile('/textFiles/en10k.txt');

    let wordList = "";
    let en100Arr = en100Txt.split(/\r?\n/);
    //alert(t100Array);
    let en1kArr = en1kTxt.split(/\r?\n/);
    let en10kArr = en10kTxt.split(/\r?\n/);

    for(let i = 1; i <= words; i++ )
    {
        let fileRandom = Math.floor(Math.random()*100);
        let word;
        if (fileRandom > 60){
            //alert("t100");
            word = en100Arr[Math.floor(Math.random()*en100Arr.length)];
        }
        else if (fileRandom > 10){
            //alert("super common");
            word = en1kArr[Math.floor(Math.random()*en1kArr.length)];
        }
        else{
            //alert("common");
            word = en10kArr[Math.floor(Math.random()*en10kArr.length)];
        }
        // no capital letter for now
        if(/[A-Z]/.test(word)){
            i--;
        }
        else{
            wordList = wordList + word + " ";
        }
        
    }
    wordList = wordList.substring(0,wordList.length-1);  
    //alert(wordList);
    return wordList;
};

const loadQuote = async (size) =>{
    
    try {
        const response = await fetch('/textFiles/quotes.json'); 
        const data = await response.json();
        
        // Randomly select a quote
        const quotes = data.quotes;
        let filteredQuotes = [];
        if (size === 'short') {
            filteredQuotes = quotes.filter(quote => quote.length < 70);
        } 
        else if (size === 'medium') {
            filteredQuotes = quotes.filter(quote => quote.length >= 70 && quote.length < 150);
        } 
        else if (size === 'long') {
            filteredQuotes = quotes.filter(quote => quote.length >= 150 && quote.length < 300);
        }
        else if (size === 'Xlong') {
            filteredQuotes = quotes.filter(quote => quote.length >= 300);
        }
        else{
            filteredQuotes = quotes
        }
        let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        let randomQuote = filteredQuotes[randomIndex];
        
        console.log(randomQuote.text);
        return randomQuote.text;
    } catch (error) {
        console.error('Error loading quotes:', error);
    }
    
    
}

module.exports = {
    loadLetters,
    loadWords,
    loadQuote
}