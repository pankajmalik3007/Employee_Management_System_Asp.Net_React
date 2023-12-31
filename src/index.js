import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider } from './Component/Auth/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </AuthProvider>
);


reportWebVitals();
