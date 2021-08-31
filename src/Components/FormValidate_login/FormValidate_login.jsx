import { useCallback, useEffect } from 'react';
import { doFetch } from '../../Helpers/Fetching';
import Style from './FormValidate_login.module.scss';

const FormValidate = (props) => {

    const formFields = props.inputs;

    const userData = {
        username: null,
        password: null
    };

    const checkingIfLoggedin = () => {
        if(JSON.parse(sessionStorage.getItem('token'))) {
            if(!JSON.parse(sessionStorage.getItem('token')).message) {
                window.location = '/admin'
            } else {
                return false;
            } 
        } else {
            return false
        }
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
            userData.username = e.target.value;
        }
        if(e.target.name === 'Kodeord') {
            userData.password = e.target.value;
        }

        removeError(e);
    }, [])

    const handleError = (element, error_message) => {
        element.style.borderColor = 'red';
        const error = document.querySelector('.error_message');
        if(!error) {
            element.parentElement.insertAdjacentHTML('afterend', `<p class="error_message">${error_message}</p>`);
        }
    }

    const getData = async () => {
        const url = `https://api.mediehuset.net/token`;
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('password', userData.password);

        const response = await doFetch(url, 'POST', formData);

        sessionStorage.setItem('token', JSON.stringify(response, null, 2));
        checkingIfLoggedin();
    }

    const handleSubmit = () => {
        const required_fields = [...document.querySelectorAll('.required')];
        let hasError = false;

        for(let input of required_fields) {
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
                            handleError(input, 'Feltet må kun indeholde tekst');
                            return false;
                        }
                        break;
                    case 'number':
                        if(!isNumber(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet må kun indeholde tal');
                            return false;
                        }
                        break;
                    case 'email':
                        if(!isEmail(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet må kun indeholde email');
                            return false;
                        }
                        break;
                    case 'checkbox':
                        if(!input.checked) {
                            hasError = true;
                            handleError(input, 'Dette felt skal være checked');
                        }
                        break;
                }
            }
        }

        if(!hasError) {
            getData();
            
        }
    }

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

    useEffect(() => {
        checkingIfLoggedin();
    }, [])


    return (
        <form className={Style.formValidate}>
            {formFields && formFields.map((item, index) => {
                return (
                    <div key={index} className={`${Style.formValidate_formGroup} ${item.width}`}>
                        <label className={Style.formValidate_label} htmlFor={item.name}>{item.name}</label>
                        <div className={Style.formValidate_span}>
                            <input className={item.required ? `${Style.formValidate_input} required` : `${Style.formValidate_input}`} type={item.type} name={item.name} onKeyUp={(e) => {settingData(e)}} onClick={item.type === 'checkbox' ? (e) => {removeError(e)} : null}/>
                            <p style={item.message ? {display: "flex"} : {display: 'none'} }>{item.message}</p>
                        </div>
                    </div>
                )
            })}

            <div className={Style.formValidate_buttonGroup}>
                <button type="button" className={Style.formValidate_button}>Annuller</button>
                <button type="button" className={Style.formValidate_button} onClick={handleSubmit}>Send</button>
            </div>
        </form>
    )
}

export { FormValidate };