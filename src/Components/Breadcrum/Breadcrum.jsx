import Style from './Breadcrum.module.scss';
import { House } from '../../Assets/Svg/SvgComponents';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';

const Breadcrum = (props) => {
    const {selectedCategory, setSelectedCategory, selectedSubcategory, setSelectedSubcategory, selectedProduct} = useContext(AppContext);

    const [breadcrum, setBreadcrum] = useState();
    
    const checkRoute = (route) => {
        if(route !== 'produkter') {
            setSelectedCategory('');
            setSelectedSubcategory('');
        }
    }

    useEffect(() => {
        setBreadcrum(props.route);
        checkRoute(props.route);
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