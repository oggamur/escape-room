import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store/store';
import { fetchQuestsAction } from './store/api-actions';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchQuestsAction());
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>
  </Provider>
);
