import { useContext, useState } from 'react';
import Style from './CartItem.module.scss';
import { AppContext } from "../../Context/ContextProvider";
import { doFetch } from '../../Helpers/Fetching';

const CartItem = (props) => {
    const data = props.data;
    const place = props.place;

    const [count, setCount] = useState(1);
    const {shoppingcart, setShoppingcart, totalPrice, setTotalPrice, loginData} = useContext(AppContext);

    const updateAmount = async (event) => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        let formData = new FormData();
            formData.append('product_id', data.id);
            formData.append('field', 'quantity');
            formData.append('value', count);
        const response = await doFetch(url, 'PATCH', formData, key);
        return response;
    }

    const handleCount = (event)=> {
        switch(event) {
            default:
                break;
            case 'rem': 
                if(count > 1) {
                    setCount(count - 1)
                    setTotalPrice(parseInt(totalPrice) - parseInt(data.price))

                    if(loginData.user_id) {
                        setTimeout(() => {
                            updateAmount();
                        }, [100])
                    }
                }
                break;
            case 'add':
                setCount(count + 1)
                setTotalPrice(parseInt(totalPrice) + parseInt(data.price))

                if(loginData.user_id) {
                    setTimeout(() => {
                        updateAmount();
                    }, [100])
                }
                break;
        }
    }

    const removeItemFromList = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart/${place}`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'DELETE', null, key);
        return response;
    }

    const handleRemove = () => {
        setTotalPrice(parseInt(totalPrice) - parseInt(data.price * count))
        const temp = [...shoppingcart];
        temp.splice(place, 1);
        setShoppingcart(temp);

        if(loginData.user_id) {
            removeItemFromList();
        }
    }

    return (
        <figure className={Style.cart_item}>
            <img src={data.image_fullpath ? data.image_fullpath : data.image.fullpath} alt={data.name} />
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