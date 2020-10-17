import React from 'react';
import styles from './Cart.module.scss';
import { useCartTotals, } from '@context/StoreContext';

const Cart = () => {
    const { total } = useCartTotals()

    return (
        <div className={ styles.cart }>
            { total }
        </div>
    );
}

export default Cart;
