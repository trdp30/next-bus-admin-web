import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './containers/App';
import './index.css';
import store from './store';

const rootElement = document.getElementById('root');
let root: Root;
if (rootElement) {
  root = createRoot(rootElement);
}

const renderApp = () => {
  if (root && root.render) {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  } else {
    console.error('Root element with id "root" not found in the document.');
  }
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers/App', renderApp);
}
//Dev env deployment update
renderApp();
