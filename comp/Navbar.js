import Link from "next/link";
import styles from "../styles/nav.module.css"

const Navbar = () => {
    return ( 
        <nav>
            <Link href="/" className = {styles.logo}>Utyper</Link>
            <Link href="/" className = {styles.link}>Normal</Link>
            <Link href="/" className = {styles.link}>Targeted</Link>
            <Link href="/Settings" className = {styles.link}>Settings</Link>

        </nav>
    );
}

export default Navbar;