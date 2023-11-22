import 'jsdom-global/register';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders app with essential components and routes', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Verifica la existencia de los componentes esenciales en la aplicación
  expect(screen.getByTestId('landing-container')).toBeInTheDocument();
  expect(screen.getByTestId('home-component')).toBeInTheDocument();
  expect(screen.getByTestId('dog-detail-component')).toBeInTheDocument();
  expect(screen.getByTestId('create-dog-component')).toBeInTheDocument();
  expect(screen.getByTestId('about-component')).toBeInTheDocument();
});







