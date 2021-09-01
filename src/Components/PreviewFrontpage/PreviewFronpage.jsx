import Style from './PreviewFrontpage.module.scss';
import { AppContext } from '../../Context/ContextProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom'

import {doFetch} from '../../Helpers/Fetching';

const PreviewFrontpage = (props) => {
    const product = props.object;

    const {shoppingcart, setShoppingcart, setTotalPrice, totalPrice, loginData} = useContext(AppContext);

    const user_pushToCart = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        let formData = new FormData();
            formData.append('product_id', product.id);
            formData.append('quantity', 1);
        const response = await doFetch(url, 'POST', formData, key)
        return response;
    }
    
    const handleClick = () => {
        setTotalPrice(parseInt(totalPrice) + parseInt(product.price))
        setShoppingcart([...shoppingcart, product]);

        if(loginData.user_id) {
            user_pushToCart();
        }
    }

    return (
        <figure className={Style.previewFrontpage}>
            <img src={product.image_fullpath} alt={product.name} />
            <figcaption>
                <h3>{product.name}</h3>
                <p>{product.description_short}</p>
                <Link to={`/produkter/`}>Læs mere</Link>
                <span>
                    <p>Pris: {product.price}</p>
                    <button onClick={handleClick}>Læg i kurv</button>
                </span>
            </figcaption>
        </figure>
    )
}

export { PreviewFrontpage };