import Style from './Navigation.module.scss'
import {Link} from 'react-router-dom';

import logo from '../../Assets/Svg/Logo.svg'
import { Mail, Phone, ShoppingBasket } from '../../Assets/Svg/SvgComponents'

import { AppContext } from '../../Context/ContextProvider';
import { useContext, useState } from 'react';

const Navigation = () => {

    const {shoppingcart, loginData, setLoginData} = useContext(AppContext);
    const [menuActive, setMenuActive] = useState(false);
    const [menuName, setMenuName] = useState('Menu');

    const handleLogout = () => {
        setLoginData({});
        sessionStorage.clear();
        closeMenu();
    }

    const handleMenu = () => {
        setMenuActive(!menuActive);
        if(menuActive) {
            setMenuName('Menu')
        } else {
            setMenuName('Luk')
        }
    }

    const closeMenu = () => {
        setMenuActive(false);
        setMenuName('Menu');
    }

    return (
        <header className={Style.pageNavigation}>
            <span className={Style.pageNavigation_menuWithLogo}>
                <img className={Style.pageNavigation_logo} src={logo} alt="strings online logo" />
                <nav className={Style.pageNavigation_menu}>
                    <ul className={menuActive ? Style.active : null}>
                        <Link onClick={closeMenu} className={Style.pageNavigation_link} to="/"><li>Forside</li></Link>
                        <Link onClick={closeMenu} className={Style.pageNavigation_link} to="/handelsbetingelser"><li>Salgs- og handelbetingelser</li></Link>
                        {loginData.user_id ? <Link onClick={handleLogout} className={`${Style.pageNavigation_link} ${Style.pageNavigation_link_login}`} to="/"><li>Logout</li></Link> :
                        <Link onClick={closeMenu} className={`${Style.pageNavigation_link} ${Style.pageNavigation_link_login}`} to="/login"><li>Login</li></Link>}
                        {loginData.user_id ? <Link onClick={closeMenu} className={`${Style.pageNavigation_link} ${Style.pageNavigation_link_admin}`} to="/admin"><li>Admin</li></Link> : null}
                    </ul>

                    <p onClick={handleMenu} className={Style.hiddenMenu}>{menuName}</p>
                </nav>
            </span>

            <span className={Style.pageNavigation_searchAndInfo}>
                <div className={!menuActive ? `${Style.pageNavigation_info}` : `${Style.active} ${Style.pageNavigation_info}`}>
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