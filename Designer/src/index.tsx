import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { FirebaseAppProvider } from 'reactfire';
import App from './app';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const firebaseConfig = {
  apiKey: 'AIzaSyBwscW0OfHmQ9IvDcaNEdUrrBkLL2uLo1Q',
  authDomain: 'eduvr-fd56d.firebaseapp.com',
  projectId: 'eduvr-fd56d',
  storageBucket: 'eduvr-fd56d.appspot.com',
  messagingSenderId: '947278970521',
  appId: '1:947278970521:web:f6a61faed80a6ed5d30208',
};

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
);
