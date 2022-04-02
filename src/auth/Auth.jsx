import React from "react";
import PropTypes from "prop-types";
import "./auth.scss";
import FargotWindow from "../fargotWindow/FargotWindow.jsx";
import RegisterWindow from "../registerWindow/RegisterWindow.jsx";
import { useDispatch, useSelector } from "react-redux";
import { registerOnAction, registerOffAction } from '../store/registerReducer.jsx';
import { forgotPasswordOnAction, forgotPasswordOffAction } from '../store/forgotPasswordReducer.jsx';

function Auth(props) {
  let forgot = useSelector(state => state.forgotPassword);
  let registred = useSelector(state => state.registred);
  let dispatch = useDispatch();
  let url = `http://localhost:3000/users/`;

  function forgotPassword() {
    let formFargotPassword = new FormData(
      document.querySelector(".fargot_window_form")
    );

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let password = null;
        data.forEach((obj) => {
          if (
            formFargotPassword.get("mail") === obj.mail &&
            formFargotPassword.get("code") === obj.code
          ) {
            password = obj.password;
          }
        });
        if (password) {
          alert(`Пароль: ${password}`);
          dispatch(forgotPasswordOffAction());
        } else {
          alert("Проверьте правильность логина и секретного кода.");
        }
      });
  }

  function register() {
    let formFargotPassword = new FormData(
      document.querySelector(".register_window_form")
    );

    document.querySelectorAll(".register_window_input._req").forEach((elem) => {
      if (elem.value.length > 1 && elem.value.length < 20) {
        elem.classList.remove("_err");
      } else {
        elem.classList.add("_err");
      }
    });

    if (document.querySelectorAll(".register_window_input._err").length === 0) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let dataNewUser = {
            id: data.length + 1,
            login: formFargotPassword.get("login"),
            mail: formFargotPassword.get("mail"),
            code: formFargotPassword.get("code"),
            password: formFargotPassword.get("password"),
            contacts: [],
          }

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(dataNewUser),
          })
            .then(response => response.json())
            .then(data => {
              alert('Регистрация прошла успешно.')
              dispatch(registerOffAction());
            })
        });
    }
  }

  return (
    <div className="auth">
      {forgot.forgotPassword ? (
        <FargotWindow
          setPassword={dispatch}
          forgotPassword={forgotPassword}
        />
      ) : (
        false
      )}
      {registred.registred ? (
        <RegisterWindow setDataAuth={dispatch} register={register} />
      ) : (
        false
      )}
      <div className="auth__wrapper">
        <div className="auth__title">Авторизация</div>
        <span className="verify_data"></span>
        <form className="auth__form">
          <input
            name="login"
            placeholder="Имя пользователя"
            type={"text"}
            className="auth__input auth__user_name"
          />
          <input
            name="password"
            placeholder="Пароль"
            type={"text"}
            className="auth__input auth__user_password"
          />
          <button onClick={props.verifyData} className="auth__user_button">
            Войти
          </button>
        </form>
        <div className="auth__user_footer">
          <span>
            <a onClick={() => dispatch(forgotPasswordOnAction())} href="#">
              Забыли пароль?
            </a>
          </span>
          <span>
            <a onClick={() => dispatch(registerOnAction())} href="#">
              Регистрация
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

Auth.propTypes = {
  verifyData: PropTypes.func,
};

export default Auth;
