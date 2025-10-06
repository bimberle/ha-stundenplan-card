import './stundenplan-card';
import './editor';
export * from './types';
export { StundenplanCard } from './stundenplan-card';
export { StundenplanCardEditor } from './editor';

// Registriere die Card bei Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ha-stundenplan-card',
  name: 'Stundenplan Card',
  description: 'Eine konfigurierbare Card für Stundenplan-Anzeige',
  getConfigElement: () => {
    return document.createElement('ha-stundenplan-card-editor');
  },
  getStubConfig: () => ({
    type: 'custom:ha-stundenplan-card',
    server: '',
    username: '',
    password: '',
    height: 400,
    title: 'Stundenplan',
  }),
});

console.info(
  `%c STUNDENPLAN-CARD %c v1.0.0 `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);