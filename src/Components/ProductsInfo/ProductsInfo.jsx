import { useContext, useEffect, useState } from 'react';
import { doFetch } from '../../Helpers/Fetching';
import Style from './ProductsInfo.module.scss';
import { AppContext } from '../../Context/ContextProvider';
import { RatingSystem } from '../RatingSystem/RatingSystem';

const ProductsInfo = () => {
    const [ product, setProduct ] = useState({})

    const { shoppingcart, setShoppingcart, totalPrice, setTotalPrice, selectedProduct } = useContext(AppContext);

    const getData = async () => {
        const url = `https://api.mediehuset.net/stringsonline/products/${selectedProduct.id}`;
        const response = await doFetch(url);
        setProduct(response);
    }

    useEffect(() => {
        getData();
    }, [selectedProduct]);

    const addToShoppingcart = () => {
        setShoppingcart([...shoppingcart, product]);
        setTotalPrice(parseInt(totalPrice) + parseInt(product.price))
    } 

    return (
        <div className={Style.products_info_grid}>
            <span className={Style.products_info_gallery}>
                {product.gallery && product.gallery.length ? product.gallery.map((item, index) => {
                    return (
                        <img key={index} src={item.fullpath} alt={item.filename} />
                    )
                }): null}
                {product.image ? <img src={product.image.fullpath} alt={product.image.pathname}/> : null}
            </span>
            <span className={Style.products_info_info}>
                <h1>{product.name}</h1>
                <p>{product.description_long}</p>

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
                <img src={product.brand_image} alt={product.brand} />
                <div className={Style.cartOptions}>
                    <input type="text" value="1"/>
                    <span>
                        <p>Pris: {product.price}</p>
                        <button onClick={addToShoppingcart}>Læg i kurv</button>
                    </span>
                </div>
                <p className={Style.stock}>{product.stock} på lager</p>
                <RatingSystem />
            </span>
        </div>
    )
}

export {ProductsInfo};