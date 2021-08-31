import Style from './PreviewFrontpage.module.scss';
import { AppContext } from '../../Context/ContextProvider';
import { useContext } from 'react';

const PreviewFrontpage = (props) => {
    const product = props.object;

    const {shoppingcart, setShoppingcart, setTotalPrice, totalPrice} = useContext(AppContext);
    
    const handleClick = () => {
        setTotalPrice(parseInt(totalPrice) + parseInt(product.price))
        setShoppingcart([...shoppingcart, product]);
    }

    return (
        <figure className={Style.previewFrontpage}>
            <img src={product.image_fullpath} alt={product.name} />
            <figcaption>
                <h3>{product.name}</h3>
                <p>{product.description_short} læs mere..</p>
                <span>
                    <p>Pris: {product.price}</p>
                    <button onClick={handleClick}>Læg i kurv</button>
                </span>
            </figcaption>
        </figure>
    )
}

export { PreviewFrontpage };