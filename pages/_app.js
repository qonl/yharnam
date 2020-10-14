import App from 'next/app'
import React from 'react';
import { getByType } from '../lib/api';
import { PRISMIC_CONFIG } from '../config/prismic';

// Create a context for the layout, as to not
// fetch this information on every page change
export const LayoutContext = React.createContext();
const LayoutProvider = LayoutContext.Provider;

function MyApp({ Component, pageProps, header, footer }) {
    return (
        <LayoutProvider value={{ header, footer }}>
            <Component { ...pageProps } />
        </LayoutProvider>
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