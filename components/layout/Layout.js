import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import { LayoutContext } from '../../pages/_app';

const Layout = Component => {
    const L = props => {
        const { header, footer } = useContext(LayoutContext);
        return (
            <div className="layout">
                <Header data={ header } />
                <main id="#main" className="page-wrapper">
                    <Component { ...props } />
                </main>
                <Footer data={ footer } />
            </div>
        )
    }

    return L;
}

export default Layout;