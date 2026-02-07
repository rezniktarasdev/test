import React, { useState } from 'react';

const NAV_ITEMS = [
  { href: '#about', label: 'Про гурт' },
  { href: '#concerts', label: 'Концерти' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#contact', label: 'Контакти' },
];

export default function HeroSection({
  mobileMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onScrollToContact,
  concerts,
  onTicketOrder,
}) {
  const [ticketPanelOpen, setTicketPanelOpen] = useState(false);

  const handlePrimaryClick = () => {
    setTicketPanelOpen((prev) => !prev);
  };

  const handleOrder = (city) => {
    onTicketOrder(city);
    setTicketPanelOpen(false);
  };

  const handleNavClick = (event, href) => {
    event.preventDefault();
    onCloseMenu();

    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="hero" id="top">
      <div className="overlay"></div>
      <nav className="container nav">
        <a href="#top" className="brand" onClick={(event) => handleNavClick(event, '#top')}>
          G&G
        </a>
        <button
          className="menu-toggle"
          aria-label="Відкрити меню"
          aria-expanded={mobileMenuOpen}
          onClick={onToggleMenu}
        >
          ☰
        </button>
        <ul className={`menu ${mobileMenuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container hero-content">
        <h1>Гурт «Грим та Грім»</h1>
        <p className="subtitle">Справжній український рок, який гуркотить в серці.</p>
        <p>
          «Грим та Грім» — це поєднання потужних гітарних рифів, чесних текстів і вибухової
          енергії сцени. Ми граємо для тих, хто цінує живий звук, свободу та силу музики.
        </p>
        <p>
          <a className="accent concerts-link" href="/concerts-info.html">Наші концерти</a> — це завжди контакт з залом, драйв і емоції.
          Приєднуйся до нас на найближчих виступах і відчуй цю силу наживо!
        </p>
        <div className="hero-ticket-cta">
          <button
            className="btn btn-primary"
            type="button"
            aria-expanded={ticketPanelOpen}
            aria-controls="hero-ticket-panel"
            onClick={handlePrimaryClick}
          >
            ЗАМОВИТИ КВИТОК
          </button>
          {ticketPanelOpen && (
            <div className="ticket-panel" id="hero-ticket-panel">
              <p className="ticket-panel-title">Оберіть місто концерту:</p>
              <div className="ticket-panel-list">
                {concerts.map((concert) => (
                  <button
                    key={concert.city}
                    className="btn btn-ticket"
                    type="button"
                    onClick={() => handleOrder(concert.city)}
                  >
                    {concert.city}
                  </button>
                ))}
              </div>
              <button className="ticket-panel-link" type="button" onClick={onScrollToContact}>
                Або перейти до форми контакту
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
