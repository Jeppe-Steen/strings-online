import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { ShowProducts } from "../../Components/ShowProducts/ShowProducts";

import Style from './Products.module.scss';
import { ProductsInfo } from "../../Components/ProductsInfo/ProductsInfo";
import { doFetch } from "../../Helpers/Fetching";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";

const Products = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '');

    const {selectedCategory ,selectedSubcategory} = useContext(AppContext);
    const [brands, setBrands] = useState([]);

    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    const getBrands = async () => {
        const url = `https://api.mediehuset.net/stringsonline/groups/${selectedCategory.id}/subgroup/${selectedSubcategory.id}`;
        const response = await doFetch(url);

        // creating filteroptions.
        const list = []
        if(response.subgroup.products.length) {
            for (let item of response.subgroup.products) {
                list.push(item.brand)
            }
        } 
        
        const uniqueBrands = [...new Set(list)];
        setBrands(uniqueBrands);
    }

    useEffect(() => {
        getBrands();

        const selects = [...document.querySelectorAll('.filter')];
        selects.forEach(element => {
            element.selectedIndex = 0;
        });
    }, [selectedCategory, selectedSubcategory])



    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBreadcrum} />
            <ProductNav />
            <section className={`${Style.products} content`}>
                <Switch>
                    <Route exact path={`${url}`}> <Redirect to={`${url}/1/2`}/></Route>

                    <Route exact path={`${url}/:productCategory/:productSubcategory`}>
                        <header>
                            <select onChange={(e) => {setFilter(e.target.value)}} className={`${Style.filter} filter`}>
                                <option value="" selected disabled>Producent</option>
                                {brands.length && brands.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select onChange={(e) => {setSort(e.target.value)}} className={`${Style.filter} filter`}>
                                <option value="" selected disabled>Sorter efter..</option>
                                <option value="rating">Mest populær</option>
                                <option value="high">Pris opad</option>
                                <option value="low">Pris nedad</option>
                                <option value="A">Alfabetisk (A-Z)</option>
                                <option value="Z">Alfabetisk (Z-A)</option>
                            </select>
                        </header>
                        <ShowProducts filter={filter} sort={sort}/>
                    </Route>

                    <Route exact path={`${url}/:productCategory/:productSubcategory/:product`}>
                        <ProductsInfo />
                    </Route>
                </Switch>
            </section>
        </main>
    )
}

export { Products };