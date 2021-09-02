import Style from './PageFooter.module.scss';
import Logo from '../../Assets/Svg/Logo.svg';
import Mmdf from '../../Assets/Svg/Mmdf.svg';

const PageFooter = () => {
    return (
        <footer className={Style.pageFooter}>
            <img className={Style.logo} src={Logo} alt="Logo" />
            <img src={Mmdf} alt="Makes music do fine" />
        </footer>
    )
}

export {PageFooter};