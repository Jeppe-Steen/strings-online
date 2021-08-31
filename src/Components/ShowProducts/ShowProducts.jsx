import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doFetch } from "../../Helpers/Fetching";
import { PreviewProducts } from "../PreviewProducts/PreviewProducts";

import Style from './ShowProducts.module.scss';

const ShowProducts = (props) => {
    const setProductCategory = props.setProductCategory;
    const setProductSubcategory = props.setProductSubcategory;

    const [products, setProducts] = useState([]);
    let {productCategory ,productSubcategory} = useParams();

    const getProducts = async () => {
        const url = `https://api.mediehuset.net/stringsonline/groups/${productCategory}/subgroup/${productSubcategory}`
        const response = await doFetch(url);
        setProducts(response.subgroup.products)
    }

    useEffect(() => {
        getProducts();
        setProductCategory(productCategory);
        setProductSubcategory(productSubcategory);
    }, [productCategory, productSubcategory])

    return (
       <article className={Style.productGrid}>
           {products.length && products.map(product => {
               return (
                   <PreviewProducts data={product}/>
               )
           })}
       </article>
    )
}

export { ShowProducts };