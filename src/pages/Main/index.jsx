import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "../../images/white_logo.png";
import styles from "./styles.module.scss";

const navLinks = [
	{ name: "Sign up", link: "/signup" },
	{ name: "Log in", link: "/login" },
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container}>
				<Link to="/" className={styles.nav_logo}>
					<img src={logo} alt="logo" />
				</Link>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<h1>Stream Music</h1>
					<p>Play and share songs that you love, with the all new Musica Player.</p>
					<Link to="/signup">
						<Button
							label="SIGN UP"
							style={{ color: "#2941ab", width: "18rem", fontSize: "1.4rem" }}
						/>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Main;
