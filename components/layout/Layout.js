import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <div className="layout">
            <Header />
            <main id="#main" className="page-wrapper">
                { props.children }
            </main>
            <Footer />
        </div>
    )
}

export default Layout;