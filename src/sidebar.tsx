import ReactDOM from 'react-dom/client';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import App from "./App.tsx";

const container = document.getElementById('vouch-sidebar-container');
if (container) {
    const shadowRoot = container.attachShadow({mode: 'open'});

    const mountPoint = document.createElement('div');
    shadowRoot.appendChild(mountPoint);

    const cache = createCache({
        key: 'vouch',
        container: shadowRoot,
        prepend: true,
    });

    ReactDOM.createRoot(mountPoint).render(
        <CacheProvider value={cache}>
            <App/>
        </CacheProvider>
    );
}
