import Style from './Breadcrum.module.scss';
import { House } from '../../Assets/Svg/SvgComponents';
import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

const Breadcrum = (props) => {
    const productCategory = props.productCategory;
    const productSubcategory = props.productSubcategory;

    const [breadcrum, setBreadcrum] = useState();

    const {url} = useRouteMatch();

    useEffect(() => {
        setBreadcrum(props.route);
    }, [props])

    return (
        <section className={Style.breadcrum}>
            <House color="neonGreen" />
            <p>forside \</p>
            <p>{breadcrum}</p>
            {productCategory ? <p> \ {productCategory} \</p> : null}
            {productSubcategory ? <p>{productSubcategory}</p> : null}
        </section>
    )
}

export { Breadcrum };