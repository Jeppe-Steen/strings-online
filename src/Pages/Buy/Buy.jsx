import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";
import { useRouteMatch } from "react-router";

import Style from './Buy.module.scss';
import { useCallback } from "react";

const Buy = () => {
    const { url } = useRouteMatch();
    const passedBreadcrum = url.replace('/', '');

    const inputData = {
        firstname: '',
        lastname: '',
        adress: '',
        zipcode: null,
        city: '',
        email: '',
        phone: null,
        reg_num: null,
        card_num: null,
        month: null,
        year: null,
        code: null,
        card_name: '',
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
        if(e.target.name === 'Brugernavn') {
            inputData.username = e.target.value;
        }
        if(e.target.name === 'Kodeord') {
            inputData.password = e.target.value;
        }

        removeError(e);
    }, [])


    //add onKeyUp to every input.









    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBreadcrum} />
            <ProductNav />
            <section className={`${Style.buy} content`}>
                <header><h1>Kasse</h1></header>


                <form className={Style.buy_form} action="">

                    <div className={Style.buy_section}>
                        <h2>Fakturerings- & leveringsadresse</h2>
                        <input className={`${Style.fullWidth} required`} type="text"  placeholder="Fornavn *" />
                        <input className={`${Style.fullWidth} required`} type="text" placeholder="Efternavn *" />
                        <input className={`${Style.fullWidth} required`} type="text" placeholder="Gade/vej *" />

                        <span className={Style.buy_section_city}>
                            <span className={Style.inputWrapper}>
                                <input className={`${Style.halfWidth} required`} type="number" placeholder="Postnr. *" />
                            </span>
                            <span className={Style.inputWrapper}>
                                <input className={`${Style.halfWidth} required`} type="text" placeholder="By *" />
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
                            <input className={`${Style.fullWidth} required`} type="email" placeholder="Emailadresse *" />
                        </span>
                        <span className={Style.inputWrapper}>
                            <input className={`${Style.fullWidth}`} type="number" placeholder="Telefonnummer" />
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

                            <div className={Style.hiddenMenu}>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth}`} type="text" placeholder="Regnr. Kortnr. *" />
                                </span>
                            </div>
                        </div>

                        <div className={Style.buy_payment}>
                            <span className={Style.buy_section_radio}>
                                <input name="transfer" type="radio" value="card" checked/>
                                <label htmlFor="">Kreditkort (MasterCard, VISA)</label>
                            </span>

                            <div className={Style.hiddenMenu}>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth} required`} type="number" placeholder="Kortnummer *" />
                                </span>
                                <span className={Style.buy_section_year}>
                                    <span className={Style.inputWrapper}>
                                        <input className={`${Style.halfWidth} required`} type="number" placeholder="Måned *"/>
                                    </span>
                                    <span className={Style.inputWrapper}>
                                        <input className={`${Style.halfWidth} required`} type="number" placeholder="År *"/>
                                    </span>
                                </span>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth} required`} type="number" placeholder="Kontrolciffer *" />
                                </span>
                                <span className={Style.inputWrapper}>
                                    <input className={`${Style.fullWidth} required`} type="text" placeholder="Kort indehaver *" />
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