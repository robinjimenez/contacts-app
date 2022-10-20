import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Contacts app/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders contact list', () => {
  render(<App />);
  const linkElement = screen.getByText(/Your contacts/i);
  expect(linkElement).toBeInTheDocument();
});

/* test('renders contact detail', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */
