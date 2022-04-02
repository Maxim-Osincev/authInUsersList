import React from "react";
import "./app.scss";
import Auth from './auth/Auth.jsx';
import ListContacts from './listContacts/ListContacts.jsx';
import { useDispatch, useSelector } from "react-redux";
import { authOnAction, authOffAction } from './store/authReducer.jsx';

function App() {

  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function verifyData(e){
    e.preventDefault();

    let verifyData = document.querySelector('.verify_data');
    let inputName = document.querySelector('.auth__user_name');
    let inputPassword = document.querySelector('.auth__user_password');
    
    if(inputName.value == '' || inputPassword.value == ''){
      verifyData.textContent = '';
      verifyData.textContent = 'Не заполнены обязательные поля.';
      inputName.value == '' ? inputName.classList.add('_err') : inputName.classList.remove('_err');
      inputPassword.value == '' ? inputPassword.classList.add('_err') : inputPassword.classList.remove('_err');
    } else{
      verifyData.textContent = '';
      inputName.classList.remove('_err');
      inputPassword.classList.remove('_err');
      let url = 'http://localhost:3000/users'
      let authForm = new FormData(document.querySelector('.auth__form'));

      let coincidences = 0;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          data.forEach(elem => {
          if(elem.login === authForm.get('login') && elem.password === authForm.get('password')){
            coincidences++
            dispatch(authOnAction(elem.id));
          }
        }) 
        if(coincidences === 0){
          alert('Совпадений не найдено')
        }})      
    }
  }

  function authOut(){
    dispatch(authOffAction());
  }

  if(auth.auth && auth.userId){
    return (
      <ListContacts authOut={authOut} activeUserId={auth.userId}/>
    )
  } else{
    return <Auth verifyData={verifyData} />
  }
}

export default App;