import { useContext, useEffect, useState } from "react";
import { doFetch } from "../../Helpers/Fetching";
import { PreviewProducts } from "../PreviewProducts/PreviewProducts";

import Style from './ShowProducts.module.scss';

import { AppContext } from "../../Context/ContextProvider";

const ShowProducts = (props) => {
    const filter = props.filter;
    const sort = props.sort;

    const { selectedCategory, selectedSubcategory } = useContext(AppContext);

    const [products, setProducts] = useState([]);
    const [changedProducts, setChangedProducts] = useState([]);

    const getProducts = async () => {
        const url = `https://api.mediehuset.net/stringsonline/groups/${selectedCategory.id}/subgroup/${selectedSubcategory.id}`
        const response = await doFetch(url);
        setProducts(response.subgroup.products);
        setChangedProducts(response.subgroup.products);
    }

    useEffect(() => {
        getProducts();
        
    }, [selectedCategory, selectedSubcategory])

    const filterProducts = () => {
        const filteredProducts = products.filter(elements => elements.brand === filter);
        setChangedProducts(filteredProducts);
    }

    const sortProducts = () => {
        let sortedProducts = [];
        switch(sort) {
            default:
                break;
            case 'rating':
                sortedProducts = changedProducts.sort((a, b) => {
                    return b.rating - a.rating;
                })
                break;
            case 'high':
                sortedProducts = changedProducts.sort((a, b) => {
                    return b.price - a.price;
                })
                break;
            case 'low':
                sortedProducts = changedProducts.sort((a, b) => {
                    return a.price - b.price;
                })
                break;
            case 'A':
                sortedProducts = changedProducts.sort((a, b) => {
                    const nameA = a.title;
                    const nameB = b.title;
                    return nameA > nameB;
                })
                break;
            case 'Z':
                sortedProducts = changedProducts.sort((a, b) => {
                    const nameA = a.title;
                    const nameB = b.title;
                    return nameA < nameB;
                })
                break;
        }
        setChangedProducts(sortedProducts);
    }
    useEffect(() => {
        filterProducts();
    }, [filter])

    useEffect(() => {
        sortProducts();
    }, [sort]);

    return (
       <article className={Style.productGrid}>
           {changedProducts.length && changedProducts.map(product => {
               return (
                   <PreviewProducts data={product}/>
               )
           })}
       </article>
    )
}

export { ShowProducts };