import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UNSAFE_CONTENT_PATTERN = /<[^>]*>|javascript:|on\w+\s*=|data:text\/html|vbscript:|eval\s*\(|document\.|window\./i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALIDATION_MESSAGES = {
  nameMin: 'Імʼя має містити мінімум 2 символи.',
  nameUnsafe: 'Поле містить недопустимі символи або код.',
  emailInvalid: 'Вкажіть коректний email.',
  emailUnsafe: 'Email містить недопустимі символи або код.',
  messageMin: 'Повідомлення має містити мінімум 10 символів.',
  messageUnsafe: 'Повідомлення містить недопустимі символи або код.',
};

export default function ContactSection() {
  const dispatch = useDispatch();
  const { form, errors, status, statusType, selectedCity } = useSelector((state) => state);
  const cityQuery = encodeURIComponent(selectedCity);

  const onFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } });
  };

  const hasUnsafeContent = (value) => UNSAFE_CONTENT_PATTERN.test(value);

  const validateForm = () => {
    const nextErrors = { name: '', email: '', message: '' };
    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (trimmed.name.length < 2) {
      nextErrors.name = VALIDATION_MESSAGES.nameMin;
    } else if (hasUnsafeContent(trimmed.name)) {
      nextErrors.name = VALIDATION_MESSAGES.nameUnsafe;
    }

    if (!EMAIL_PATTERN.test(trimmed.email)) {
      nextErrors.email = VALIDATION_MESSAGES.emailInvalid;
    } else if (hasUnsafeContent(trimmed.email)) {
      nextErrors.email = VALIDATION_MESSAGES.emailUnsafe;
    }

    if (trimmed.message.length < 10) {
      nextErrors.message = VALIDATION_MESSAGES.messageMin;
    } else if (hasUnsafeContent(trimmed.message)) {
      nextErrors.message = VALIDATION_MESSAGES.messageUnsafe;
    }

    const isValid = Object.values(nextErrors).every((message) => message === '');
    if (!isValid) {
      dispatch({
        type: 'SET_VALIDATION',
        payload: {
          errors: nextErrors,
          status: 'Будь ласка, виправте помилки у формі.',
          statusType: 'error',
        },
      });
    }

    return isValid;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }
  };

  return (
    <section className="container contact" id="contact">
      <h2 className="center">Зв'яжись з нами</h2>
      <p className="center muted">Хочеш заказати виступ або маєш питання? Пиши!</p>
      <div className="contact-grid">
        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="name">Ім'я *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ваше ім'я"
            value={form.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
          <small className="error">{errors.name}</small>

          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
          />
          <small className="error">{errors.email}</small>

          <label htmlFor="message">Повідомлення *</label>
          <textarea
            id="message"
            name="message"
            placeholder="Розкажи про свої ідеї..."
            value={form.message}
            onChange={(event) => onFieldChange('message', event.target.value)}
          ></textarea>
          <small className="error">{errors.message}</small>

          <button className="btn btn-pink" type="submit">
            Відправити
          </button>
          <p className={`form-status ${statusType}`}>{status}</p>
        </form>

        <div className="map-wrap">
          <h3>Наше місцезнаходження</h3>
          <iframe
            title={`Мапа міста ${selectedCity}`}
            src={`https://www.google.com/maps?q=${cityQuery}&output=embed`}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
