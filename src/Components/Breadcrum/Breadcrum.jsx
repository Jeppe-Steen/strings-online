import Style from './Breadcrum.module.scss';
import { House } from '../../Assets/Svg/SvgComponents';

const Breadcrum = (props) => {
    const breadcrum = props.route

    return (
        <section className={Style.breadcrum}>
            <House color="neonGreen" />
            <p>forside</p>
            <p>\</p>
            <p>{breadcrum}</p>
        </section>
    )
}

export { Breadcrum };