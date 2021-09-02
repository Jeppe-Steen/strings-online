import Style from './Navigation.module.scss'
import {Link} from 'react-router-dom';

import logo from '../../Assets/Svg/Logo.svg'
import { Mail, Phone, ShoppingBasket } from '../../Assets/Svg/SvgComponents'

import { AppContext } from '../../Context/ContextProvider';
import { useContext } from 'react';

const Navigation = () => {

    const {shoppingcart, loginData, setLoginData} = useContext(AppContext);

    const handleLogout = () => {
        setLoginData({});
        sessionStorage.clear();
    }

    return (
        <header className={Style.pageNavigation}>
            <span className={Style.pageNavigation_menuWithLogo}>
                <img className={Style.pageNavigation_logo} src={logo} alt="strings online logo" />
                <nav className={Style.pageNavigation_menu}>
                    <ul>
                        <Link className={Style.pageNavigation_link} to="/"><li>Forside</li></Link>
                        <Link className={Style.pageNavigation_link} to="/handelsbetingelser"><li>Salgs- og handelbetingelser</li></Link>
                        {loginData.user_id ? <Link onClick={handleLogout} className={`${Style.pageNavigation_link} ${Style.pageNavigation_link_login}`} to="/"><li>Logout</li></Link> :
                        <Link className={`${Style.pageNavigation_link} ${Style.pageNavigation_link_login}`} to="/login"><li>Login</li></Link>}
                        {loginData.user_id ? <Link className={`${Style.pageNavigation_link} ${Style.pageNavigation_link_admin}`} to="/admin"><li>Admin</li></Link> : null}
                    </ul>
                </nav>
            </span>

            <span className={Style.pageNavigation_searchAndInfo}>
                <div className={Style.pageNavigation_info}>
                    <div className={Style.pageNavigation_info_mail}>
                        <Mail color="white" />
                        <p>mail@mail.com</p>
                    </div>
                    <div className={Style.pageNavigation_info_phone}> 
                        <Phone color="white" />
                        <p>+45 11 22 33 44</p>
                    </div>
                    <div className={Style.pageNavigation_info_cart}>
                        <Link to="/indkøbskurv"><ShoppingBasket color="white" /></Link>
                        <p className={Style.count}>{shoppingcart.length}</p>
                    </div>
                </div>
                <div className={Style.pageNavigation_search}>
                    <input type="text" placeholder="Indtast søgeord"/>
                    <button type="button">søg</button>
                </div>
            </span>
        </header>
    )
}

export { Navigation };