import { useContext, useEffect, useState } from "react";
import { doFetch } from "../../Helpers/Fetching";
import { PreviewProducts } from "../PreviewProducts/PreviewProducts";

import Style from './ShowProducts.module.scss';

import { AppContext } from "../../Context/ContextProvider";

const ShowProducts = () => {

    const { selectedCategory, selectedSubcategory } = useContext(AppContext);

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const url = `https://api.mediehuset.net/stringsonline/groups/${selectedCategory}/subgroup/${selectedSubcategory}`
        const response = await doFetch(url);
        setProducts(response.subgroup.products)
    }

    useEffect(() => {
        getProducts();
        
    }, [selectedCategory, selectedSubcategory])

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