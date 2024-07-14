import CharElement from "../comp/CharElement";
import styles from "../styles/index.module.css"
function WordContainer({wordObj, letters}){
    var wordLetters = [];
    for(var i = wordObj.start; i <= wordObj.end; i++){
        wordLetters.push(letters[i]);
    }
    //alert(JSON.stringify(wordLetters));
    return(
        <div className={styles.word}>
        {wordLetters.map(letter => (
            <CharElement
                key={letter.id}
                letterObj={letter} 
            />
            ))}
        </div>
    )

}


export default WordContainer;