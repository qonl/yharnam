import App from 'next/app'
import React from 'react';
import Layout from '@components/layout/Layout';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component { ...pageProps } />
        </Layout>
    );
}

MyApp.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps }
}

export default MyApp;