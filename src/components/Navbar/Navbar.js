import './Navbar.css';
import './Navbar-mobile.css';
import logo from '../../ressources/image/logo.png';



function Navbar(props) {
    return (
        <div className="navbar">
            <div className="logo-container" onClick={()=>props.setTutorial(true)}>
                <img className="logo" src={logo} alt="logo"/>
                <span className="logo-text">Naturalisation </span>
            </div>
        </div>
    );
}

export default Navbar;
