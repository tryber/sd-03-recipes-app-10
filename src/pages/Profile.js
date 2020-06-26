import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Profile() {
  return (
    <div>
      {Header('Perfil', false)}
      <Footer />
    </div>
  );
}
