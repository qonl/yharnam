import React from 'react';
import styles from './Cart.module.scss';
import { useCartItems, useCartTotals } from '@context/StoreContext';
import LineItem from '@components/layout/Cart/LineItem/LineItem';

const Cart = () => {
    const { total } = useCartTotals()
    const lineItems = useCartItems();



    return (
        <div className={ styles.cart }>
            { lineItems.length > 0 ? (
                <div>
                    { lineItems.map(item => {
                        // console.log(item);
                        return <LineItem
                            key={ item.id + item.quantity }
                            { ...item }
                        />
                    })}
                </div>) : (<div>Cart is empty</div>) }

            { total }
        </div>
    );
}

export default Cart;
