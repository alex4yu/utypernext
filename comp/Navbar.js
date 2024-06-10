import Link from "next/link";
import styles from "../styles/nav.module.css"

const Navbar = () => {
    return ( 
        <nav>
            <div className = {styles.logo}>Utyper</div>
            <div className = {styles.link}>ABC</div>
            <div className = {styles.link}>Target</div>

        </nav>
     );
}
 
export default Navbar;