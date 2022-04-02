import React from "react";
import PropTypes from 'prop-types'
import "./registerWindow.scss";
import { registerOnAction, registerOffAction } from '../store/registerReducer.jsx';

function RegisterWindow(props){

    function register (e){
        e.preventDefault();
        props.register();
    }

    return(
        <div className="register_window">
            <form className="register_window_form">
                <div onClick={() => props.setDataAuth(registerOffAction())} className="register_window-close">+</div>
                <div className="register_window_title">Регистрация</div>
                <input type="text" name="login" placeholder="Логин" className="register_window_input register_window_login _req" />
                <input type="text" name="mail" placeholder="E-mail" className="register_window_input register_window_mail _req" />
                <input autoComplete="on" type="text" name="password" placeholder="Пароль" className="register_window_input register_window_password _req" />
                <input autoComplete="on" type="text" name="second_password" placeholder="Повторите пароль" className="register_window_input register_window_second_password _req" />
                <input type="text" name="code" placeholder="Секретный код" className="register_window_input register_window_code _req" />
                <button onClick={register} className="register_window_button">Зарегистрироваться</button>
            </form>
        </div>
    )
}

RegisterWindow.propTypes = {
    register: PropTypes.func,
    setDataAuth: PropTypes.func,
};

export default RegisterWindow;