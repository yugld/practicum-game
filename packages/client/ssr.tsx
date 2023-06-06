import React from 'react';
import App from './src/App';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

export {store} from './src/store/store';

export function render(store: any) {
  return renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
};
