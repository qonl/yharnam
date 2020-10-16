import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useCartCount } from '../../../context/StoreContext';

const Header = () => {
    const count = useCartCount();

    return (
        <div className={ styles.header }>
            <Link href="/"><a><h1 className="title">Home</h1></a></Link>
            <div className="header__cart-count">{ count }</div>
        </div>
    );
}

export default Header;
