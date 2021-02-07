import React from 'react';
import styles from './Drawer.module.scss';
import Cart from '../Cart';
import { useStore, useToggleCart, useCartTotals, useCartItems, useCheckout } from '@context/StoreContext';
import Link from 'next/link';
import cx from 'classnames';

const Drawer = () => {
    const lineItems = useCartItems()
    const { cartOpen } = useStore();
    const toggleCart = useToggleCart();
    const openCheckout = useCheckout();
    const { total } = useCartTotals();

    const trap = cartOpen ? (
        <div className={ styles['drawer__inner'] }>
            <div className={ styles['drawer__header'] }>
                <h4>Your Cart</h4>
                <button
                    className={ styles['drawer__close'] }
                    onClick={ () => toggleCart() }
                >
                    close
                </button>
            </div>
            <Cart/>
            { lineItems.length < 1 ? (
                <Link
                    onClick={ () => {
                        toggleCart();
                    } }
                    href='/'
                >
                    <a>Continue Shopping</a>
                </Link>
            ) : (
                <button
                    onClick={ openCheckout }
                    type='submit'
                >
                    <span>Checkout</span>
                </button>
            ) }
        </div>
    ) : false;

    return (
        <div className={ cx(styles['drawer'], cartOpen ? styles['is-open'] : null) }>
            { trap }
        </div>
    );
}

export default Drawer;