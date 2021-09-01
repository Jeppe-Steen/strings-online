import Style from './Breadcrum.module.scss';
import { House } from '../../Assets/Svg/SvgComponents';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';

const Breadcrum = (props) => {
    const {selectedCategory, selectedSubcategory, selectedProduct} = useContext(AppContext);

    const [breadcrum, setBreadcrum] = useState();

    useEffect(() => {
        setBreadcrum(props.route);
    }, [props])

    return (
        <section className={Style.breadcrum}>
            <House color="neonGreen" />
            <p>forside \</p>
            <p>{breadcrum}</p>
            {selectedCategory ? <p>\ {selectedCategory} \</p> : null}
            {selectedSubcategory ? <p>{selectedSubcategory}</p> : null}
            {selectedProduct ? <p> {selectedProduct} </p> : null}
        </section>
    )
}

export { Breadcrum };