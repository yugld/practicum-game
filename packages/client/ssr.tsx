import React from 'react';
import App from './src/App';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from './src/store/store';
import { routes } from './src/routes/routes';
import { matchPath } from 'react-router-dom';
import { Route } from './src/routes/routes';
import { NotFound } from './src/pages/notFound/NotFound';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

export { store } from './src/store/store';

export async function render(url: string) {
  const [pathName] = url.split('?');
  const store = createStore();

  console.debug('url:' + url);

  // change before commit
  let currentRoute = routes.find(route => matchPath(pathName, route.path));
  if (!currentRoute) {
    currentRoute = {
      path: '*',
      exact: false,
      component: NotFound,
    }
  }
  console.debug(currentRoute);

  const { loader } = currentRoute as Route;
  if (loader) {
    await loader(store.dispatch);
  }

  const initialState = store.getState();

  const key = 'custom';
  const cache = createCache({ key });
  console.debug('cache=' + JSON.stringify(cache));

  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  console.debug('extractCriticalToChunks:' + extractCriticalToChunks);

  const renderResult = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </CacheProvider>
  );
  console.debug('renderResult:' + renderResult);
  const chunks = extractCriticalToChunks(renderResult);
  const styles = constructStyleTagsFromChunks(chunks);
  console.debug('styles:' + styles);

  return [initialState, renderResult, chunks, styles];
};
