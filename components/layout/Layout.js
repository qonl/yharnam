import React, { useContext } from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import { LayoutContext } from '../../context/LayoutContext';
import SEO from '@components/SEO';
import {StoreContextProvider} from '../../context/StoreContext';

/**
 * Wraps the page component with Global header and footer
 * @param {function} Component - the page component
 * @returns {function(*): JSX.Element}
 * @constructor
 */
const Layout = Component => {
    /**
     * Wrapper for the page component
     * @param {object} props - page props
     * @returns {JSX.Element}
     * @constructor
     */
    const Page = props => {
        return (
            <LayoutContext.Provider value={{ header: props?.header, footer: props?.footer }}>
                <StoreContextProvider>
                    <div className="layout">
                        { props?.page && <SEO data={ props?.page } /> }
                        <Header data={ props?.header } />
                        <main id="#main" className="page-wrapper">
                            <Component { ...props} />
                        </main>
                        <Footer data={ props?.footer } />
                    </div>
                </StoreContextProvider>
            </LayoutContext.Provider>
        )
    }



    return Page;
}

export default Layout;