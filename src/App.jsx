import { useDispatch, useSelector } from 'react-redux';

const concerts = [
  { city: 'Київ', place: 'Dockers Pub', seats: 250, date: '25.10.2025, 19:00' },
  { city: 'Львів', place: '!FESTrepublic', seats: 400, date: '01.11.2025, 20:00' },
  { city: 'Одеса', place: 'Зелений театр', seats: 700, date: '09.11.2025, 19:30' },
  { city: 'Харків', place: 'ArtZavod', seats: 500, date: '16.11.2025, 19:00' },
];

const members = [
  {
    name: 'Максим — гітара',
    image:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Олена — вокал',
    image:
      'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Тарас — барабани',
    image:
      'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80',
  },
];

function ContactSection() {
  const dispatch = useDispatch();
  const { form, errors, status, statusType } = useSelector((state) => state);

  const onFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } });
  };

  const validateForm = () => {
    const nextErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Імʼя має містити мінімум 2 символи.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Вкажіть коректний email.';
      isValid = false;
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = 'Повідомлення має містити мінімум 10 символів.';
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
            title="Мапа Києва"
            src="https://www.google.com/maps?q=Kyiv&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const mobileMenuOpen = useSelector((state) => state.mobileMenuOpen);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTicketOrder = (city) => {
    dispatch({ type: 'SET_MESSAGE_FROM_TICKET', payload: { city } });
    scrollToContact();
  };

  const closeMenu = () => dispatch({ type: 'CLOSE_MENU' });

  return (
    <>
      <header className="hero" id="top">
        <div className="overlay"></div>
        <nav className="container nav">
          <a href="#top" className="brand" onClick={closeMenu}>
            G&G
          </a>
          <button
            className="menu-toggle"
            aria-label="Відкрити меню"
            onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
          >
            ☰
          </button>
          <ul className={`menu ${mobileMenuOpen ? 'open' : ''}`}>
            {[
              { href: '#about', label: 'Про гурт' },
              { href: '#concerts', label: 'Концерти' },
              { href: '#gallery', label: 'Галерея' },
              { href: '#contact', label: 'Контакти' },
            ].map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container hero-content">
          <h1>Гурт «Грім та Грім»</h1>
          <p className="subtitle">Справжній український рок, який гуркотить в серці.</p>
          <p>
            «Грім та Грім» — це поєднання потужних гітарних рифів, чесних текстів і вибухової
            енергії сцени. Ми граємо для тих, хто цінує живий звук, свободу та силу музики.
          </p>
          <p>
            <span className="accent">Наші концерти</span> — це завжди контакт з залом, драйв і емоції.
            Приєднуйся до нас на найближчих виступах і відчуй цю силу наживо!
          </p>
          <button className="btn btn-primary" onClick={scrollToContact}>
            ЗАКАЗАТИ КВИТОК
          </button>
        </div>
      </header>

      <main>
        <section className="container concerts" id="concerts">
          <h2>Найближчі концерти</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Місто / Заклад</th>
                  <th>К-сть місць</th>
                  <th>Дата і час</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((concert) => (
                  <tr key={concert.city}>
                    <td>
                      <strong>{concert.city}</strong> — {concert.place}
                    </td>
                    <td>{concert.seats}</td>
                    <td>{concert.date}</td>
                    <td>
                      <button className="btn btn-ticket" onClick={() => handleTicketOrder(concert.city)}>
                        Замовити квиток
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="container" id="gallery">
          <h2 className="center">Учасники гурту</h2>
          <div className="members">
            {members.map((member) => (
              <article className="card" key={member.name}>
                <img src={member.image} alt={member.name} />
                <p>{member.name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story" id="about">
          <div className="container story-grid">
            <div>
              <h2>Наша історія</h2>
              <p>
                «Грім та Грім» народився з бажання створювати музику, яка відчувається серцем. Ми
                почали свій шлях у маленькій студії в центрі Києва, де кожен акорд, кожне слово було
                наповнене емоціями та переживаннями.
              </p>
              <p>
                За роки нашої діяльності ми виступили на десятках сцен, від невеликих клубів до
                великих фестивалів. Наше звучання — це поєднання традиційного року з сучасними
                елементами.
              </p>
              <p>
                Кожен наш виступ — це не просто концерт, а справжнє шоу, де ми ділимось своєю енергією
                з глядачами та створюємо неповторну атмосферу.
              </p>
            </div>
            <img
              className="story-image"
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
              alt="Концертний виступ гурту"
            />
          </div>
        </section>

        <ContactSection />
      </main>

      <footer>
        <div className="container footer">
          <div>
            <p>© 2025 «Грім та Грім». Всі права захищені.</p>
            <p>booking@lotoplay • +38 (099) 123-45-67</p>
          </div>
          <p>Instagram · YouTube · Facebook</p>
        </div>
      </footer>
    </>
  );
}
