import { createStore } from 'redux';

const initialState = {
  mobileMenuOpen: false,
  form: {
    name: '',
    email: '',
    message: '',
  },
  errors: {
    name: '',
    email: '',
    message: '',
  },
  status: '',
  statusType: 'idle',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case 'CLOSE_MENU':
      return { ...state, mobileMenuOpen: false };
    case 'SET_FIELD':
      return {
        ...state,
        form: { ...state.form, [action.payload.field]: action.payload.value },
      };
    case 'SET_MESSAGE_FROM_TICKET':
      return {
        ...state,
        form: {
          ...state.form,
          message: `Хочу замовити квиток на концерт у місті ${action.payload.city}.`,
        },
      };
    case 'SET_VALIDATION':
      return {
        ...state,
        errors: action.payload.errors,
        status: action.payload.status,
        statusType: action.payload.statusType,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        form: { name: '', email: '', message: '' },
        errors: { name: '', email: '', message: '' },
        status: 'Дякуємо! Повідомлення успішно відправлено.',
        statusType: 'success',
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);
