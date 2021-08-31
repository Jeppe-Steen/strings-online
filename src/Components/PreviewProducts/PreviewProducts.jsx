import Style from './PreviewProducts.module.scss';
import { AppContext } from '../../Context/ContextProvider';
import { useContext } from 'react';

const PreviewProducts = (props) => {
    const dataObject = props.data;

    const {shoppingcart, setShoppingcart, totalPrice, setTotalPrice} = useContext(AppContext);

    const handleClick = () => {
        setTotalPrice(parseInt(totalPrice) + parseInt(dataObject.price))
        setShoppingcart([...shoppingcart, dataObject]);
    }

    return (
        <figure className={Style.previewProducts}>
            <img src={dataObject.image_fullpath} alt={dataObject.name} />
            <figcaption>
                <span className={Style.previewProducts_info}>
                    <h2>{dataObject.name}</h2>
                    <p>{dataObject.description_short} læs mere...</p>
                </span>
                <span className={Style.previewProducts_buttons}>
                    <p className={Style.price}>pris: DKK {dataObject.price}</p>
                    <button onClick={handleClick} className={Style.add}>Læg i kurv</button>
                    <p className={Style.count}>{dataObject.stock} på lager</p>
                </span>
            </figcaption>
        </figure>
    )
}

export {PreviewProducts};