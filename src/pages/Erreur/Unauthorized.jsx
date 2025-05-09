import React from 'react';
import ErreurPages from './ErreurPages';

const Unauthorized = () => {
  return (
    <ErreurPages
      code="401"
      title="Accès non autorisé"
      message="Vous n'avez pas les permissions nécessaires pour accéder à cette page."
      buttonText="Retour à l'accueil"
      buttonLink="/"
    />
  );
};

export default Unauthorized;

