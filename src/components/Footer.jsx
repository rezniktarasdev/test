import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="container footer">
        <div>
          <p>© 2025 «Грім та Грім». Всі права захищені.</p>
          <p>
            <a className="footer-link" href="mailto:booking@lotoplay">booking@lotoplay</a>
            {' • '}
            <a className="footer-link" href="tel:+380991234567">+38 (099) 123-45-67</a>
          </p>
        </div>
        <p className="footer-socials">
          <a className="footer-link" href="/instagram.html">Instagram</a>
          {' · '}
          <a className="footer-link" href="/youtube.html">YouTube</a>
          {' · '}
          <a className="footer-link" href="/facebook.html">Facebook</a>
        </p>
      </div>
    </footer>
  );
}
