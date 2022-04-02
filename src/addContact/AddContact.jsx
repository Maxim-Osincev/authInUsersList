import React from 'react';
import PropTypes from 'prop-types'
import './addContact.scss'
import { activeAddContactAction, inactiveAddContactAction, contactEditTrueAction, contactEditFalseAction, selectedContactEditTrueAction, selectedContactEditFalseAction } from '../store/listContactsReducer.jsx'

function AddContact(props){

    function addContact(e){
        e.preventDefault();

        let addContactForm = new FormData(document.querySelector('.add_contact_window-form'));
        let name = addContactForm.get('name');
        let surname = addContactForm.get('surname');
        let number = addContactForm.get('number');
        let comment = addContactForm.get('comment');

        document.querySelectorAll('.add_contact_window-input._req').forEach(elem => {
            if(elem.value.length > 1 && elem.value.length < 20){
                elem.classList.remove('_err');
            } else{
                elem.classList.add('_err');
            }
        });


        if(document.querySelectorAll('.add_contact_window-input._err').length === 0){
            let url = `http://localhost:3000/users/${props.activeUserId}`

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    data.contacts.push({
                        "name": `${name}`,
                        "surname": `${surname}`,
                        "number": `${number}`,
                        "comment": `${comment}`
                    });
    
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(data => props.getData())
                });
    
    
            //Закрываем окно добавления контакта
            props.addContact(inactiveAddContactAction());
        }
    }

    return (
        <div className="add_contact_window">
            <form className="add_contact_window-form">
                <div onClick={() => props.addContact(inactiveAddContactAction())} className="add_contact_window-close">+</div>
                <div className="add_contact_window-title">Добавить контакт</div>
                <input name="name" placeholder="Имя" type="text" className="add_contact_window-name add_contact_window-input _req"></input>
                <input name="surname" placeholder="Фамилия" type="text" className="add_contact_window-surname add_contact_window-input _req"></input>
                <input name="number" placeholder="Номер" type="text" className="add_contact_window-number add_contact_window-input _req"></input>
                <input name="comment" placeholder="Комментарий" type="text" className="add_contact_window-comment add_contact_window-input"></input>
                <button type='submit' onClick={addContact} className="add_contact_window-button">Добавить</button>
            </form>
        </div>
    )
}

AddContact.propTypes = {
    activeUserId: PropTypes.number,
    addContact: PropTypes.func,
    getData: PropTypes.func,
}

export default AddContact;