const loadLetters = () =>{
    console.log("loading letters");
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let charArr = [];
    let id = 0;
    for(let i = 1; i <= 10; i++ ){
        let wordLength = Math.floor(Math.random()*5)+2;
        for (let i = 1; i <= wordLength; i++){
            let character_chosen = alphabet.charAt(Math.floor(Math.random()*26));
            let charData = {id: id, char: character_chosen, status: "new"}
            id++;
            charArr.push(charData);
        }
        charArr.push({id: id, char: " ", status: "new"});   
        id++    
    }
    charArr.pop();
    return charArr;
};

module.exports = {
    loadLetters
}