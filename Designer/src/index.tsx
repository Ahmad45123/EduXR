import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { FirebaseAppProvider } from 'reactfire';
import App from './app';
import { firebaseConfig } from './firebaseConfig';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
);
