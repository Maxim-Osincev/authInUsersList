const initialState = {
  listContacts: {},
  addContact: false,
  contactEdit: false,
  selectedContactEdit: null,
};

const TOGGLE_LIST_CONTACTS = 'TOGGLE_LIST_CONTACTS';

const ACTIVE_ADD_CONTACT = "ACTIVE_ADD_CONTACT";
const INACTIVE_ADD_CONTACT = "INACTIVE_ADD_CONTACT";

const CONTACT_EDIT_TRUE = "CONTACT_EDIT_TRUE";
const CONTACT_EDIT_FALSE = "CONTACT_EDIT_FALSE";

const SELECTED_CONTACT_EDIT_TRUE = "SELECTED_CONTACT_EDIT_TRUE";
const SELECTED_CONTACT_EDIT_FALSE = "SELECTED_CONTACT_EDIT_FALSE";


export const listContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIST_CONTACTS:
      return {
        ...state,
        listContacts: action.contacts,
      };
    case ACTIVE_ADD_CONTACT:
      return {
        ...state,
        addContact: true,
      };
    case INACTIVE_ADD_CONTACT:
      return {
        ...state,
        addContact: false,
      };
    case CONTACT_EDIT_TRUE:
      return {
        ...state,
        contactEdit: true,
      };
    case CONTACT_EDIT_FALSE:
      return {
        ...state,
        contactEdit: false,
      };
    case SELECTED_CONTACT_EDIT_TRUE:
      return {
        ...state,
        selectedContactEdit: action.selectedContactEdit,
      };
    case SELECTED_CONTACT_EDIT_FALSE:
      return {
        ...state,
        selectedContactEdit: null,
      };
    default:
      return {
        ...state,
      };
  }
};


export const contactsListAction = (contacts) => ({type: TOGGLE_LIST_CONTACTS, contacts});

export const activeAddContactAction = () => ({type: ACTIVE_ADD_CONTACT});
export const inactiveAddContactAction = () => ({type: INACTIVE_ADD_CONTACT});

export const contactEditTrueAction = () => ({type: CONTACT_EDIT_TRUE});
export const contactEditFalseAction = () => ({type: CONTACT_EDIT_FALSE});

export const selectedContactEditTrueAction = (id) => ({type: SELECTED_CONTACT_EDIT_TRUE, selectedContactEdit: id});
export const selectedContactEditFalseAction = () => ({type: SELECTED_CONTACT_EDIT_FALSE});