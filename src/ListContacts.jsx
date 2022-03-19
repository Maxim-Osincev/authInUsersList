import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./listContacts.scss";
import AddContact from "./AddContact.jsx";
import EditContact from "./EditContact.jsx";

function ListContacts(props) {
  let [listContacts, toggleContacts] = useState({});
  let [contact, addContact] = useState(false);
  let [contactEdit, setEditContact] = useState(false);
  let [selectedContactEdit, setSelectedContactEdit] = useState(null);

  let url = "http://localhost:3000/users";

  function getData() {
    return fetch(url)
      .then((response) => response.json())
      .then((data) =>
        data.forEach((elem) => {
          if (elem.id === props.activeUserId) {
            toggleContacts(elem.contacts);
          }
        })
      );
  }

  useEffect(() => {
    getData();
  }, []);

//Удаление записи
function deleteContact() {
  let url = `http://localhost:3000/users/${props.activeUserId}`;
  const newData = [];

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      Array.from(document.querySelectorAll('.contacts__list-checkbox')).forEach((elem, index) => {
        if(!elem.checked){
          //Если элемент в состоянии checked, то удаляем
          newData.push(data.contacts[index]);
        }
      });
      //Так как delete оставляет в массиве empty, делаем проверку на наличие значения и возвращаем новый массив
      data.contacts = [...newData];
      

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        //Получаем и рендерим новые данные
        getData();
        Array.from(document.querySelectorAll('.contacts__list-checkbox')).forEach(elem => elem.checked = false)
      });
    });
}

  function editContact(id){
    setEditContact(true);
    setSelectedContactEdit(id)
  }


  return (
    <div className="contacts">
      {contact ? (
        <AddContact
          activeUserId={props.activeUserId}
          addContact={addContact}
          getData={getData}
        />
      ) : (
        false
      )}
      {contactEdit ? (
        <EditContact
            selectedContactEdit={selectedContactEdit}
            activeUserId={props.activeUserId}
            setEditContact={setEditContact}
            getData={getData}
            />
      ) : (
        false
      )}
      <div onClick={props.authOut} className="go_out">
        выйти
      </div>
      <div className="contacts__wrapper">
        <div className="contacts__header">
          <div className="contacts__header-checkbox contacts__header-item"></div>
          <div className="contacts__header-name contacts__header-item">Имя</div>
          <div className="contacts__header-surname contacts__header-item">
            Фамилия
          </div>
          <div className="contacts__header-number contacts__header-item">
            Номер
          </div>
          <div className="contacts__header-comment contacts__header-item">
            Комментарий
          </div>
        </div>
        {listContacts.length > 0 ? (
          <div className="contacts__list">
            {listContacts.map((contact, id) => {
              return (
                <div key={id} className="contacts__list-row">
                  <div className="contacts__list-checkbox_wrapper contacts__list-item">
                    <input id="contact_checkbox" className="contacts__list-checkbox" type="checkbox" />
                    <label htmlFor="contact_checkbox" className="contacts__list-label" type="checkbox" />
                  </div>
                  <div className="contacts__list-name contacts__list-item">
                    {contact.name}
                  </div>
                  <div className="contacts__list-surname contacts__list-item">
                    {contact.surname}
                  </div>
                  <div className="contacts__list-number contacts__list-item">
                    {contact.number}
                  </div>
                  <div className="contacts__list-comment contacts__list-item">
                    {contact.comment}
                  </div>
                  <svg
                  onClick={() => editContact(id)}
                  className="contacts__list-edit"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 508.016 508.016"
                    xmlSpace="preserve"
                    height="30px"
                    width="20px"
                  >
                    <g>
                      <g>
                        <path
                          d="M487.19,99.922l-79.6-79.7c-38.2-38.2-83.4-12.9-96.3,0l-259.6,260c-1.9,1.9-3.2,4.2-3.8,6.8l-47.5,203.7
                                                                c-1.1,4.8,0.3,9.7,3.8,13.2c3.9,3.9,9.3,4.6,13.2,3.8l203.4-47.7c2.6-0.6,4.9-1.9,6.8-3.8l259.6-260
                                                                C499.99,183.422,526.79,139.622,487.19,99.922z M281.49,90.022l58,58.1l-181.3,181.6c-3.5-13.4-10.6-26.4-21.2-36.9
                                                                c-10.5-10.6-23.4-17.8-36.8-21.2L281.49,90.022z M32.99,475.122l11-46.9c14.5,9,26.9,21.4,35.9,35.9L32.99,475.122z
                                                                M209.39,433.822l-101,23.6c-13-24.5-33.3-44.9-57.8-57.8l23.6-101.2c14.3-3.1,30.7,2.3,42.8,14.4c13.2,13.2,18.5,31.6,13.5,46.8
                                                                c-1.7,5.1-0.4,10.6,3.4,14.4s9.3,5.1,14.4,3.4c15.1-5,33.5,0.2,46.7,13.5C207.09,403.022,212.49,419.422,209.39,433.822z
                                                                M236.19,407.822c-3.5-13.4-10.6-26.3-21.2-36.9c-10.6-10.6-23.4-17.7-36.9-21.2l181.4-181.7l58,58.1L236.19,407.822z
                                                                M467.19,176.322l-29.8,29.9l-136-136.2l29.8-29.9c7.5-7.5,33.4-23.1,56.4,0l79.6,79.7
                                                                C492.19,144.822,474.69,168.822,467.19,176.322z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="contacts__list-empty">Список контактов пуст</div>
        )}
          <div className="contact_button__wrapper">
            <div onClick={deleteContact} className="delete_contact-button">
              Delete contact
          </div>
            <div onClick={() => addContact(true)} className="add_contact-button">
              Add contact
            </div>
          </div>
      </div>
    </div>
  );
}

ListContacts.propTypes = {
  activeUserId: PropTypes.number,
  authOut: PropTypes.func
};

export default ListContacts;