import Style from './PreviewProducts.module.scss';
import { AppContext } from '../../Context/ContextProvider';
import { useContext, useEffect, useState } from 'react';
import { doFetch } from '../../Helpers/Fetching';
import { Link } from 'react-router-dom';

const PreviewProducts = (props) => {
    const dataObject = props.data;

    const [linkData, setLinkData] = useState({});

    const {shoppingcart, setShoppingcart, totalPrice, setTotalPrice, loginData, selectedSubcategory, setSelectedProduct} = useContext(AppContext);

    const user_pushToCart = async () => {
        const url = `https://api.mediehuset.net/stringsonline/cart`;
        const key = loginData.access_token;
        let formData = new FormData();
            formData.append('product_id', dataObject.id);
            formData.append('quantity', 1);
        const response = await doFetch(url, 'POST', formData, key)
        console.log(response);
        return response;
    }
    

    const handleClick = () => {
        setTotalPrice(parseInt(totalPrice) + parseInt(dataObject.price))
        setShoppingcart([...shoppingcart, dataObject]);

        if(loginData.user_id) {
            user_pushToCart();
        }
    }

    const getLink = async () => {
        const url = `https://api.mediehuset.net/stringsonline/groups/${selectedSubcategory}`;
        const response = await doFetch(url);
        setLinkData(response)
    };

    useEffect(() => {
        getLink();
    }, [selectedSubcategory]);

    return (
        <figure className={Style.previewProducts}>
            <img src={dataObject.image_fullpath} alt={dataObject.name} />
            <figcaption>
                <span className={Style.previewProducts_info}>
                    <h2>{dataObject.name}</h2>
                    <p>{dataObject.description_short}</p>
                    <Link onClick={() => {setSelectedProduct(dataObject.id)}}className={Style.link} to={`/produkter/${linkData.parent_id}/${linkData.id}/${dataObject.id}`}>Læs mere..</Link>
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