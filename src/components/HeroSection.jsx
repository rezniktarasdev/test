import React from 'react';

export default function HeroSection({ mobileMenuOpen, onToggleMenu, onCloseMenu, onScrollToContact }) {
  return (
    <header className="hero" id="top">
      <div className="overlay"></div>
      <nav className="container nav">
        <a href="#top" className="brand" onClick={onCloseMenu}>
          G&G
        </a>
        <button className="menu-toggle" aria-label="Відкрити меню" onClick={onToggleMenu}>
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
              <a href={item.href} onClick={onCloseMenu}>
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
        <button className="btn btn-primary" onClick={onScrollToContact}>
          ЗАКАЗАТИ КВИТОК
        </button>
      </div>
    </header>
  );
}
