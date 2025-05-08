import React from 'react';
import ErreurPages from './ErreurPages';

const NotFound = () => {
  return (
    <ErreurPages
      code="404"
      title="Oops! Page non trouvée"
      message="La page que vous cherchez n'existe pas ou a été déplacée."
      buttonText="Retour à l'accueil"
      buttonLink="/"
    />
  );
};

export default NotFound;

