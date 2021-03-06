import { useCallback, useContext } from 'react';
import { doFetch } from '../../Helpers/Fetching';
import Style from './FormValidate_login.module.scss';

import { AppContext } from '../../Context/ContextProvider';
import { useHistory } from 'react-router';

const FormValidate = (props) => {

    const formFields = props.inputs;
    const {setLoginData} = useContext(AppContext);
    const history = useHistory();

    const userData = {
        username: null,
        password: null
    };

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
            case 'username':
                userData.username = e.target.value;
                break;
            case 'password':
                userData.password = e.target.value;
                break;
        }

        removeError(e);
    }, [userData])

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

        console.log(userData);
        const response = await doFetch(url, 'POST', formData);

        sessionStorage.setItem('token', JSON.stringify(response, null, 2));
        setLoginData(response);

        history.goBack();
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
                            handleError(input, 'Feltet m?? kun indeholde tekst');
                            return false;
                        }
                        break;
                    case 'number':
                        if(!isNumber(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet m?? kun indeholde tal');
                            return false;
                        }
                        break;
                    case 'email':
                        if(!isEmail(input.value)) {
                            hasError = true;
                            handleError(input, 'Feltet m?? kun indeholde email');
                            return false;
                        }
                        break;
                    case 'checkbox':
                        if(!input.checked) {
                            hasError = true;
                            handleError(input, 'Dette felt skal v??re checked');
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
        let pattern = /^[A-Z??????a-z?????? ]+$/;
        return pattern.test(val);
    }

    // For: email
    const isEmail = (val) => {
        let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return pattern.test(val);
    }

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