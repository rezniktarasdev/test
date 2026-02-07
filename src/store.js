import { createStore } from 'redux';

const ACTIONS = {
  TOGGLE_MENU: 'TOGGLE_MENU',
  CLOSE_MENU: 'CLOSE_MENU',
  SET_FIELD: 'SET_FIELD',
  SET_MESSAGE_FROM_TICKET: 'SET_MESSAGE_FROM_TICKET',
  SET_VALIDATION: 'SET_VALIDATION',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
};

const EMPTY_FORM = {
  name: '',
  email: '',
  message: '',
};

const initialState = {
  mobileMenuOpen: false,
  form: { ...EMPTY_FORM },
  errors: { ...EMPTY_FORM },
  status: '',
  statusType: 'idle',
  selectedCity: 'Київ',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_MENU:
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case ACTIONS.CLOSE_MENU:
      return { ...state, mobileMenuOpen: false };
    case ACTIONS.SET_FIELD:
      return {
        ...state,
        form: { ...state.form, [action.payload.field]: action.payload.value },
      };
    case ACTIONS.SET_MESSAGE_FROM_TICKET:
      return {
        ...state,
        selectedCity: action.payload.city,
        form: {
          ...state.form,
          message: `Хочу замовити квиток на концерт у місті ${action.payload.city}.`,
        },
      };
    case ACTIONS.SET_VALIDATION:
      return {
        ...state,
        errors: action.payload.errors,
        status: action.payload.status,
        statusType: action.payload.statusType,
      };
    case ACTIONS.SUBMIT_SUCCESS:
      return {
        ...state,
        form: { ...EMPTY_FORM },
        errors: { ...EMPTY_FORM },
        status: 'Дякуємо! Повідомлення успішно відправлено.',
        statusType: 'success',
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);
