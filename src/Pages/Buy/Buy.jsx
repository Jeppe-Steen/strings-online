import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { useHistory, useRouteMatch } from "react-router";

import Style from './Buy.module.scss';
import { useCallback, useContext } from "react";
import { doFetch } from "../../Helpers/Fetching";
import { AppContext } from "../../Context/ContextProvider";

const Buy = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '');
    const history = useHistory();

    const {loginData, setShoppingcart, setTotalPrice} = useContext(AppContext);

    const inputData = {
        firstname: '',
        lastname: '',
        adress: '',
        zipcode: null,
        city: '',
        email: '',
        status: 1,
        phone: null, // not needed for fetch
        card_num: null, // not needed for fetch
        month: null, // not needed for fetch
        year: null, // not needed for fetch
        code: null, // not needed for fetch
        card_name: '', // not needed for fetch
    }

    const handleError = (element, error_message) => {
        element.style.borderColor = 'red';
        const error = document.querySelector('.error_message');
        if(!error) {
            element.parentElement.insertAdjacentHTML('beforeend', `<p class="error_message">${error_message}</p>`);
        }
    }

    const handleSubmit = () => {
        const requiredFields = [...document.querySelectorAll('.required')];
        let hasError = false;

        for (let input of requiredFields) {
            if(!input.value) {
                hasError = true;
                handleError(input, 'Du skal huske at udfylde feltet');
                return false;
            } else {
                switch(input.type) {
                    default:
                        break;
                    case 'text':
                        if(!isString(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet må kun indeholde bogstaver');
                            return false;
                        }
                        break;
                    case 'numer':
                        if(!isNumber(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet må kun indeholde tal');
                            return false;
                        }
                        break;
                    case 'email':
                        if(!isEmail(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet skal være en email');
                            return false;
                        }
                        break;
                }
            }
        }

        if(!hasError) {
            setShoppingcart([]);
            setTotalPrice(0);
            
            setTimeout(() => {
                postOrder();
                history.push('/kvittering');  
            }, [500])
        }
    };

    // patterns for validation
    // For: only letters
    const isNumber = (val) => {
        let pattern = /^[0-9]+$/;
        return pattern.test(val);
    }

    // For: only numbers
    const isString = (val) => {
        let pattern = /^[A-ZÆØÅa-zæøå ]+$/;
        return pattern.test(val);
    }

    // For: email
    const isEmail = (val) => {
        let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return pattern.test(val);
    }

    const removeError = (e) => {
        e.target.style.borderColor = 'unset';
        const error_message = document.querySelector('.error_message');
        if(error_message) {
            error_message.remove();
        }
    }

    const settingData = useCallback((e) => {
        switch(e.target.name) {
            default:
                break;
            case 'firstname':
                inputData.firstname = e.target.value;
                break;
            case 'lastname':
                inputData.lastname = e.target.value;
                break;
            case 'adress':
                inputData.adress = e.target.value;
                break;
            case 'zipcode':
                inputData.zipcode = e.target.value;
                break;
            case 'city':
                inputData.city = e.target.value;
                break;
            case 'email':
                inputData.email = e.target.value;
                break;
            case 'status':
                inputData.status = e.target.value;
                break;
            case 'phone':
                inputData.phone = e.target.value;
                break;
            case 'card_num':
                inputData.card_num = e.target.value;
                break;
            case 'month':
                inputData.month = e.target.value;
                break;
            case 'year':
                inputData.year = e.target.value;
                break;
            case 'code':
                inputData.code = e.target.value;
                break;
            case 'card_name':
                inputData.card_name = e.target.value;
                break;
        }

        removeError(e);
    }, [])

    const postOrder = async () => {
        const url = `https://api.mediehuset.net/stringsonline/orders`;
        const formData = new FormData();
            formData.append('firstname', inputData.firstname);
            formData.append('lastname', inputData.lastname);
            formData.append('address', inputData.adress);
            formData.append('zipcode', inputData.zipcode);
            formData.append('city', inputData.city);
            formData.append('email', inputData.email);
            formData.append('status', inputData.status);
            formData.append('delivery_address', inputData.adress);
            formData.append('delivery_zipcode', inputData.zipcode);
            formData.append('delivery_city', inputData.city);
        const token = loginData.access_token;
        const response = await doFetch(url, 'POST', formData, token);
        return response;
    }







    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBreadcrum} />
            <ProductNav />
            <section className={`${Style.buy} content`}>
                <header><h1>Kasse</h1></header>


                <form className={Style.buy_form} action="">

                    <div className={Style.buy_section}>
                        <h2>Fakturerings- & leveringsadresse</h2>
                        <input className={`${Style.fullWidth} required`} type="text" name="firstname" placeholder="Fornavn *" onKeyUp={(e) => {settingData(e)}}/>
                        <input className={`${Style.fullWidth} required`} type="text" name="lastname" placeholder="Efternavn *" onKeyUp={(e) => {settingData(e)}}/>
                        <input className={`${Style.fullWidth} required`} type="text" name="adress" placeholder="Gade/vej *" onKeyUp={(e) => {settingData(e)}}/>

                        <span className={Style.buy_section_city}>
                            <span className={Style.inputWrapper}>
                                <input className={`${Style.halfWidth} required`} type="number" name="zipcode" placeholder="Postnr. *" onKeyUp={(e) => {settingData(e)}}/>
                            </span>
                            <span className={Style.inputWrapper}>
                                <input className={`${Style.halfWidth} required`} type="text" name="city" placeholder="By *" onKeyUp={(e) => {settingData(e)}}/>
                            </span>
                        </span>

                        <span className={Style.buy_section_checkbox}>
                            <input name="otherAdress" type="checkbox" />
                            <label htmlFor="otherAdress">Anden leveringsadresse</label>
                        </span>
                    </div>

                    <div className={Style.buy_section}>
                        <h2>Email & telefon</h2>
                        <span className={Style.inputWrapper}>
                            <input className={`${Style.fullWidth} required`} type="email" name="email"  placeholder="Emailadresse *" onKeyUp={(e) => {settingData(e)}}/>
                        </span>
                        <span className={Style.inputWrapper}>
                            <input className={`${Style.fullWidth}`} type="number" name="phone" placeholder="Telefonnummer" onKeyUp={(e) => {settingData(e)}}/>
                        </span>
                        <p className={Style.message}>Med dit telefonnummer kan vi kontakte dig i tilfælde af spørgsmål eller problemer. Hvis du oplyser dit mobilnummer, kan vi også sende dig en forsendelsesbekræftelse via SMS.</p>
                    </div>

                    <div className={Style.buy_section}>
                        <h2>Betalingsmetode</h2>

                        <div className={Style.buy_payment}>
                            <span className={Style.buy_section_radio}>
                                <input name="transfer" type="radio" value="bank" />
                                <label htmlFor="">Bankoverførsel</label>
                            </span>
                        </div>

                        <div className={Style.buy_payment}>
                            <span className={Style.buy_section_radio}>
                                <input name="transfer" type="radio" value="card" checked/>
                                <label htmlFor="">Kreditkort (MasterCard, VISA)</label>
                            </span>

                            <div className={Style.hiddenMenu}>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth} required`} type="number" name="card_num" placeholder="Kortnummer *" onKeyUp={(e) => {settingData(e)}}/>
                                </span>
                                <span className={Style.buy_section_year}>
                                    <span className={Style.inputWrapper}>
                                        <input className={`${Style.halfWidth} required`} type="number" name="month" placeholder="Måned *" onKeyUp={(e) => {settingData(e)}}/>
                                    </span>
                                    <span className={Style.inputWrapper}>
                                        <input className={`${Style.halfWidth} required`} type="number" name="year" placeholder="År *" onKeyUp={(e) => {settingData(e)}}/>
                                    </span>
                                </span>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth} required`} type="number" name="code" placeholder="Kontrolciffer *" onKeyUp={(e) => {settingData(e)}}/>
                                </span>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth} required`} type="text" name="card_name" placeholder="Kort indehaver *" onKeyUp={(e) => {settingData(e)}}/>
                                </span>
                            </div>
                        </div>

                        <button type="button" onClick={handleSubmit}>Køb</button>
                    </div>
                    
                </form>
            </section>
        </main>
    )
}

export { Buy };