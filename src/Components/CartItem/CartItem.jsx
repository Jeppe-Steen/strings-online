import { useContext, useEffect, useState } from 'react';
import Style from './CartItem.module.scss';
import { AppContext } from "../../Context/ContextProvider";

const CartItem = (props) => {
    const data = props.data;
    const place = props.place;

    const [count, setCount] = useState(1);
    const {shoppingcart, setShoppingcart, totalPrice, setTotalPrice} = useContext(AppContext);

    const handleCount = (event)=> {
        switch(event) {
            default:
                break;
            case 'rem': 
                if(count > 1) {
                    setCount(count - 1)
                }
                break;
            case 'add':
                setCount(count + 1)
                break;
        }
    }

    useEffect(() => {
        setTotalPrice(totalPrice + (data.price * count))
    }, [count])

    const handleRemove = () => {
        const temp = [...shoppingcart];
        temp.splice(place, 1);
        setShoppingcart(temp);
    }

    return (
        <figure className={Style.cart_item}>
            <img src={data.image_fullpath} alt={data.name} />
            <figcaption>
                <h2>{data.name}</h2>
                <div>
                    <p className={Style.count_name}>Antal:</p>
                    <span>
                        <span>
                            <button onClick={() => {handleCount('rem')}}>-</button>
                            <p id="count">{count}</p>
                            <button onClick={() => {handleCount('add')}}>+</button>
                        </span>
                        <p>{data.stock} på lager</p>
                    </span>

                    <p className={Style.price}>DKK {data.price} </p>

                    <button onClick={handleRemove} className={Style.remove}>X</button>
                </div>
            </figcaption>
        </figure>
    )
}

export { CartItem };