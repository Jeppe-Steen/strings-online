import Style from './ProductNav.module.scss';

import { doFetch } from '../../Helpers/Fetching'
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../Context/ContextProvider';

const ProductNav = () => {
    const [productNav, setProductNav] = useState([]);
    const { setSelectedCategory, setSelectedSubcategory } = useContext(AppContext);

    const getProductNav = async () => {
        const url = `https://api.mediehuset.net/stringsonline/`;

        const response = await doFetch(url);
        const finalNav = [];

        response.productgroups.items.forEach(element => {
            const subGroups = [];
            
            element.subgroups.forEach(item => {
                subGroups.push({id: item.id, title: item.title});
            })

            finalNav.push({title: element.title, id: element.id, subgroup: subGroups, subgroup_active: false})
        })

        setTimeout(() => {
            setProductNav(finalNav);
        }, 500)
    }

    useEffect(() => {
        getProductNav();
    }, []);

    const handleClick = (cat, subCat) => {
        setSelectedCategory(cat);
        setSelectedSubcategory(subCat);
    }


    return (
        <nav className={Style.productNav}>
           <ul className={Style.productNav_menu}>
               {productNav && productNav.map((item) => {
                   return (
                       <li className={Style.productNav_menuItem} key={item.id}>{item.title}
                        <ul className={Style.productNav_submenu}>
                            {item.subgroup.map(element => {
                                return (
                                    <NavLink key={element.id} onClick={() => {handleClick(item.id, element.id)}} className={Style.productNav_submenuItem} to={`/produkter/${item.id}/${element.id}`}><li> {element.title} </li></NavLink>
                                )
                            })}
                        </ul>
                       </li>
                   )
               })}
           </ul>
        </nav>
    )
}

export { ProductNav };