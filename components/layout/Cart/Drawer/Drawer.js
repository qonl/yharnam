import React from 'react';
import styles from './Drawer.module.scss';
import Cart from '../Cart';
import { useStore, useToggleCart } from '@context/StoreContext';
import cx from 'classnames';

const Drawer = () => {
    const { cartOpen } = useStore()
    const toggleCart = useToggleCart()
    const trap = cartOpen ? (
        <div className={ styles['drawer__inner'] }>
            <div className={ styles['drawer__header'] }>
                <h4>Your Cart</h4>
                <button className={ styles['drawer__close'] }
                        onClick={ () => toggleCart() }
                >
                    close
                </button>
            </div>
            <Cart/>
        </div>
    ) : false;

    return (
        <div className={ cx( styles['drawer'], cartOpen ? 'is-open' : '') }>
            { trap }
        </div>
    );
}

export default Drawer;