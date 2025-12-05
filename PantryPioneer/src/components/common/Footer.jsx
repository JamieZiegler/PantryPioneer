import Instagram from "../../assets/images/icons/instagram.svg";
import Facebook from "../../assets/images/icons/facebook.svg";
import Linkedin from "../../assets/images/icons/linkedin.svg";

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="linkbox">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Terms and Privacy Policy</a>
                </div>
                <p>© 2024 PantryPioneer. All rights reserved.</p>
                <div className="linkbox socials">
                    <a href="#"><img src={Instagram} alt="Instagram" /></a>
                    <a href="#"><img src={Facebook} alt="Facebook" /></a>
                    <a href="#"><img src={Linkedin} alt="Linkedin" /></a>
                </div>
            </footer>
        </>
    )
}