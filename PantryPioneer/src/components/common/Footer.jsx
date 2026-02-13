import Instagram from "../../assets/images/icons/instagram.svg";
import Facebook from "../../assets/images/icons/facebook.svg";
import Linkedin from "../../assets/images/icons/linkedin.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="linkbox">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Terms &amp; Privacy</a>
            </div>
            <p>&copy; {new Date().getFullYear()} PantryPioneer. All rights reserved.</p>
            <div className="linkbox socials">
                <a href="#" aria-label="Instagram"><img src={Instagram} alt="" /></a>
                <a href="#" aria-label="Facebook"><img src={Facebook} alt="" /></a>
                <a href="#" aria-label="LinkedIn"><img src={Linkedin} alt="" /></a>
            </div>
        </footer>
    )
}