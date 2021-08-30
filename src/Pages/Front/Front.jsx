import { useEffect, useState } from "react";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { PreviewFrontpage } from "../../Components/PreviewFrontpage/PreviewFronpage";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { doFetch } from "../../Helpers/Fetching";

import Style from './Front.module.scss';

const Front = () => {

    const [bestProducts, setBestProducts] = useState([]);

    const getBestProducts = async () => {
        const listOfProducts = [];
        const categoryList_url = `https://api.mediehuset.net/stringsonline/`;

        const categoryList_response = await doFetch(categoryList_url);

        categoryList_response.productgroups.items.forEach(category => {
            category.subgroups.forEach(subgroup => {
                for(let i = 0; i <= subgroup.products.length - 1; i++) {
                    listOfProducts.push(subgroup.products[i])
                }
            })
        })

        setTimeout(() => {
            const sortedList = listOfProducts.sort(
                function(a, b) {
                    return b.rating - a.rating
                }
            )

            const finalList = sortedList.slice(0, 6);
            setBestProducts(finalList);
            console.log(finalList);
        }, [500])
    }

    useEffect(() => {
        getBestProducts();
    }, [])


    return (
        <main className={`content_container`}>
            <Breadcrum />
            <ProductNav />
            <section className="content">
                <figure className={Style.front_hero}>
                    <img src="https://cdn.mos.cms.futurecdn.net/hXjosYWpKQP2xW6xaNWJw4.jpg" alt="guitar" />
                    <figcaption>
                        <h1>Martin <strong>GPC-11E</strong></h1>
                        <p>SERIES ELECTRO ACOUSTIC</p>
                        <h2>Se den nye generation halvacoustiske</h2>
                        <button>Læs mere</button>
                    </figcaption>
                </figure>

                <article className={Style.front_customerFav}>
                    <header>
                        <h2>Kundernes <strong>favoritter</strong></h2>
                    </header>

                    <div className={Style.wrapper}>
                        {bestProducts.length && bestProducts.map(product => {
                            return (
                                <PreviewFrontpage object={product} />
                            )
                        })}
                    </div>
                </article> 
            </section>
        </main>
    )
}

export { Front };