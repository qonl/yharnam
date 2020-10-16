import App from 'next/app'
import React from 'react';
import { getByType } from '../lib/api';
import { PRISMIC_CONFIG } from '../config/prismic';
import { LayoutContext } from '../context/LayoutContext';
import { StoreContextProvider } from '../context/StoreContext';

function MyApp({ Component, pageProps, header, footer }) {
    return (
        <LayoutContext.Provider value={{ header, footer }}>
            <StoreContextProvider>
                <Component { ...pageProps } />
            </StoreContextProvider>
        </LayoutContext.Provider>
    );
}

MyApp.getInitialProps = async appContext => {
    try {
        const { HEADER, FOOTER } = PRISMIC_CONFIG.DOC_TYPES;

        const appProps = await Promise.all([
            App.getInitialProps(appContext),
            getByType(HEADER),
            getByType(FOOTER),
        ]);

        return {
            ...appProps,
            // TODO: need to find a better way to extract these
            header: appProps[1],
            footer: appProps[2],
        };
    } catch(error) {
        throw new Error(error);
    }
}

export default MyApp;