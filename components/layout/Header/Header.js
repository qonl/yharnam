import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useCartCount, useToggleCart } from '@context/StoreContext';

const Header = () => {
    const cartCount = useCartCount();
    const toggleCart = useToggleCart();

    return (
        <div className={ styles['header']}>
            <Link href="/"><a><h1 className="title">Home</h1></a></Link>
            <button
                onClick={ () => toggleCart() }
                className={ styles['header__cart-button'] }
            >
                Cart count: <span className="header__cart-count">{ cartCount }</span>
            </button>
        </div>
    );
}

export default Header;
