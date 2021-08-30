import Style from './Navigation.module.scss'

import logo from '../../Assets/Svg/Logo.svg'
import { Mail, Phone } from '../../Assets/Svg/SvgComponents'

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
                        <p>mail@mail.com</p>
                    </div>
                    <div className={Style.pageNavigation_info_phone}> 
                        <p>+45 11 22 33 44</p>
                    </div>
                    <div>
                        <p>cart</p>
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