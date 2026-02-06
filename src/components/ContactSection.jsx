import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ContactSection() {
  const dispatch = useDispatch();
  const { form, errors, status, statusType, selectedCity } = useSelector((state) => state);
  const cityQuery = encodeURIComponent(selectedCity);

  const onFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } });
  };


  const hasUnsafeContent = (value) => {
    const suspiciousPattern = /<[^>]*>|javascript:|on\w+\s*=|data:text\/html|vbscript:|eval\s*\(|document\.|window\./i;
    return suspiciousPattern.test(value);
  };

  const validateForm = () => {
    const nextErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Імʼя має містити мінімум 2 символи.';
      isValid = false;
    } else if (hasUnsafeContent(form.name.trim())) {
      nextErrors.name = 'Поле містить недопустимі символи або код.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Вкажіть коректний email.';
      isValid = false;
    } else if (hasUnsafeContent(form.email.trim())) {
      nextErrors.email = 'Email містить недопустимі символи або код.';
      isValid = false;
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = 'Повідомлення має містити мінімум 10 символів.';
      isValid = false;
    } else if (hasUnsafeContent(form.message.trim())) {
      nextErrors.message = 'Повідомлення містить недопустимі символи або код.';
      isValid = false;
    }

    if (!isValid) {
      dispatch({
        type: 'SET_VALIDATION',
        payload: {
          errors: nextErrors,
          status: 'Будь ласка, виправте помилки у формі.',
          statusType: 'error',
        },
      });
      return false;
    }

    return true;
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
