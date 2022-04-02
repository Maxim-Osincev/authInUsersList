import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './editContact.scss';
import { activeAddContactAction, inactiveAddContactAction, contactEditTrueAction, contactEditFalseAction, selectedContactEditTrueAction, selectedContactEditFalseAction } from '../store/listContactsReducer.jsx';

function EditContact(props){
    let [name, setName] = useState(document.querySelectorAll('.contacts__list-row')[props.selectedContactEdit].querySelector('.contacts__list-name').textContent);
    let [surname, setSurname] = useState(document.querySelectorAll('.contacts__list-row')[props.selectedContactEdit].querySelector('.contacts__list-surname').textContent);
    let [number, setNumber] = useState(document.querySelectorAll('.contacts__list-row')[props.selectedContactEdit].querySelector('.contacts__list-number').textContent);
    let [comment, setComment] = useState(document.querySelectorAll('.contacts__list-row')[props.selectedContactEdit].querySelector('.contacts__list-comment').textContent);

    function editContact(e){
        e.preventDefault();

        document.querySelectorAll('.edit_contact_window-input._req').forEach(elem => {
            if(elem.value.length > 1 && elem.value.length < 20){
                elem.classList.remove('_err');
            } else{
                elem.classList.add('_err');
            }
        });

        if(document.querySelectorAll('.edit_contact_window-input._err').length === 0){
            let url = `http://localhost:3000/users/${props.activeUserId}`

            fetch(url)
                .then(response => response.json())
                .then(data => data.contacts.map((elem, index) => {
                    if(index === props.selectedContactEdit){
                        Object.assign(elem, {
                            "name": name,
                            "surname": surname,
                            "number": number,
                            "comment": comment,
                        })
                    } else{
                        return elem;
                    };

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(data => props.getData())
                }));

                props.setEditContact(contactEditFalseAction())
        }
    }

    return (
        <div className="edit_contact_window">
            <form className="edit_contact_window-form">
                <div onClick={() => props.setEditContact(contactEditFalseAction())} className="edit_contact_window-close">+</div>
                <div className="edit_contact_window-title">Изменить контакт</div>
                <input name="name" placeholder="Имя" type="text" className="edit_contact_window-name edit_contact_window-input _req" value={name} onChange={e => setName(e.target.value)}/>
                <input name="surname" placeholder="Фамилия" type="text" className="edit_contact_window-surname edit_contact_window-input _req" value={surname} onChange={e => setSurname(e.target.value)}/>
                <input name="number" placeholder="Номер" type="text" className="edit_contact_window-number edit_contact_window-input _req" value={number} onChange={e => setNumber(e.target.value)}/>
                <input name="comment" placeholder="Комментарий" type="text" className="edit_contact_window-comment edit_contact_window-input" value={comment} onChange={e => setComment(e.target.value)}/>
                <button type='submit' onClick={editContact} className="edit_contact_window-button">Сохранить</button>
            </form>
        </div>
    )
}

EditContact.propTypes = {
    setEditContact: PropTypes.func,
    getData: PropTypes.func,
    activeUserId: PropTypes.number,
    selectedContactEdit: PropTypes.number,
}

export default EditContact;