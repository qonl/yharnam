import React from 'react'
import { StoreContextProvider } from '@context/StoreContext';

const MyApp = ({ Component, pageProps }) => (
    <StoreContextProvider>
        <Component { ...pageProps } />
    </StoreContextProvider>
);

export default MyApp;