import Style from './Navigation.module.scss'
import {Link} from 'react-router-dom';

import logo from '../../Assets/Svg/Logo.svg'
import { Mail, Phone, ShoppingBasket } from '../../Assets/Svg/SvgComponents'

const Navigation = () => {
    return (
        <header className={Style.pageNavigation}>
            <span className={Style.pageNavigation_menuWithLogo}>
                <img className={Style.pageNavigation_logo} src={logo} alt="strings online logo" />
                <nav className={Style.pageNavigation_menu}></nav>
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