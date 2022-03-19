import React from "react";
import PropTypes from 'prop-types'
import "./fargotWindow.scss";

function FargotWindow(props){

    function restoredPassword (e){
        e.preventDefault();
        props.forgotPassword();
    }

    return(
        <div className="fargot_window">
            <form className="fargot_window_form">
                <div onClick={() => props.setPassword(false)} className="fargot_window-close">+</div>
                <div className="fargot_window_title">Восстановление пароля</div>
                <input name="mail" placeholder="E-mail" className="fargot_window_text fargot_window_mail" />
                <input name="code" placeholder="Секретный код" className="fargot_window_text fargot_window_code" />
                <button onClick={restoredPassword} className="fargot_window_button">Восстановить</button>
            </form>
        </div>
    )
}

FargotWindow.propTypes = {
    forgotPassword: PropTypes.func,
    setPassword: PropTypes.func,
};

export default FargotWindow;