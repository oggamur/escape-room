import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store/store';
import { fetchQuestsAction } from './store/api-actions';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { checkAuthAction } from './store/api-actions';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchQuestsAction());
store.dispatch(checkAuthAction());
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>
  </Provider>
);
