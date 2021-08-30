import Style from './Breadcrum.module.scss';
import { House } from '../../Assets/Svg/SvgComponents';

const Breadcrum = () => {
    return (
        <section className={Style.breadcrum}>
            <House color="neonGreen" />
            <p>forside</p>
        </section>
    )
}

export { Breadcrum };