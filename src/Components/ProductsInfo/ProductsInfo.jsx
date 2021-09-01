import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doFetch } from '../../Helpers/Fetching';
import Style from './ProductsInfo.module.scss';
import { AppContext } from '../../Context/ContextProvider';
import { RatingSystem } from '../RatingSystem/RatingSystem';

const ProductsInfo = () => {

    const {product} = useParams();
    const [ selectedProduct, setSelectedProduct ] = useState({})

    const { shoppingcart, setShoppingcart, totalPrice, setTotalPrice } = useContext(AppContext);

    const getData = async () => {
        const url = `https://api.mediehuset.net/stringsonline/products/${product}`;
        const response = await doFetch(url);
        console.log(response);
        setSelectedProduct(response);
    }

    useEffect(() => {
        getData();
    }, [product]);

    const addToShoppingcart = () => {
        setShoppingcart([...shoppingcart, selectedProduct]);
        setTotalPrice(parseInt(totalPrice) + parseInt(selectedProduct.price))
    } 

    return (
        <div className={Style.products_info_grid}>
            <span className={Style.products_info_gallery}>
                {selectedProduct.gallery && selectedProduct.gallery.length ? selectedProduct.gallery.map((item, index) => {
                    return (
                        <img src={item.fullpath} alt={item.filename} />
                    )
                }): null}
            </span>
            <span className={Style.products_info_info}>
                <h1>{selectedProduct.name}</h1>
                <p>{selectedProduct.description_long}</p>

                <ul className={Style.products_info_table}>
                    <li>Teknisk info</li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                    <li><p>lorem ipsum</p> <p>lorem ipsum</p></li>
                </ul>
            </span>
            <span className={Style.products_info_other}>
                <img src={selectedProduct.brand_image} alt={selectedProduct.brand} />
                <div className={Style.cartOptions}>
                    <input type="text" value="1"/>
                    <span>
                        <p>Pris: {selectedProduct.price}</p>
                        <button onClick={addToShoppingcart}>Læg i kurv</button>
                    </span>
                </div>
                <p className={Style.stock}>{selectedProduct.stock} på lager</p>
                <RatingSystem rating={selectedProduct.rating} />
            </span>
        </div>
    )
}

export {ProductsInfo};