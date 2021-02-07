import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { LayoutContext } from '@context/LayoutContext';
import SEO from '@components/SEO';
import Drawer from '@components/layout/Cart/Drawer/Drawer';
import styles from './Layout.module.scss';

/**
 * Wraps the page component with Global header and footer
 * @param {function} Component - the page component
 * @returns {function(*): JSX.Element}
 * @constructor
 */
const Layout = Component => {
    return props => {
        return (
            <LayoutContext.Provider
                value={{
                    header: props?.header,
                    footer: props?.footer
                }}
            >
                <div className={ styles['layout'] }>
                    { props?.page && <SEO data={ props?.page }/>}
                    <Header data={ props?.header } />
                    <Drawer />
                    <main id="#main" className={ styles['page-wrapper'] }>
                        <Component { ...props } />
                    </main>
                    <Footer data={ props?.footer } />
                </div>
            </LayoutContext.Provider>
        )
    };
}

export default Layout;