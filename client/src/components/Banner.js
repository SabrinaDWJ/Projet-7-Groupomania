import logo from '../assets/logo.png';
import '../styles/banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Banner() {
    return (
        <div>
            <img src={logo} alt='Groupomania' className='logo' />
            <FontAwesomeIcon icon="fa-arrow-right-to-bracket" />
        </div>
    )
}


export default Banner