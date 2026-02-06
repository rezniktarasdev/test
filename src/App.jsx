import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from './components/HeroSection';
import ConcertsSection from './components/ConcertsSection';
import MembersSection from './components/MembersSection';
import StorySection from './components/StorySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { concerts, members } from './data';

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
  const toggleMenu = () => dispatch({ type: 'TOGGLE_MENU' });

  return (
    <>
      <HeroSection
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
        onScrollToContact={scrollToContact}
      />

      <main>
        <ConcertsSection concerts={concerts} onTicketOrder={handleTicketOrder} />
        <MembersSection members={members} />
        <StorySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
