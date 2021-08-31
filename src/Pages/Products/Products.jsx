import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { ShowProducts } from "../../Components/ShowProducts/ShowProducts";

import Style from './Products.module.scss';
import { useState } from "react";

const Products = () => {
    const [productCategory, setProductCategory] = useState('');
    const [productSubcategory, setProductSubcategory] = useState('');

    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '');




    return (
        <main className={`content_container`}>
            <Breadcrum productCategory={productCategory} productSubcategory={productSubcategory} route={passedBreadcrum} />
            <ProductNav />
            <section className={`${Style.products} content`}>
                <Switch>
                    <Route exact path={`${url}`}> <Redirect to={`${url}/1/2`}/></Route>
                    <Route exact path={`${url}/:productCategory/:productSubcategory`}>
                        <header>
                            <p>filter 1</p>
                            <p>filter 2</p>
                        </header>
                        <ShowProducts setProductCategory={setProductCategory} setProductSubcategory={setProductSubcategory} />
                    </Route>
                </Switch>
            </section>
        </main>
    )
}

export { Products };