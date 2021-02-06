import {
    useUpdateItemsFromCart,
    useRemoveItemFromCart,
    client
} from '@context/StoreContext';
import React, { useState } from 'react';

const LineItem = ({
    id,
    title,
    quantity,
    variant: {
        price,
        compareAtPrice,
        image
    },
    customAttributes
}) => {
    const updateItemsFromCart = useUpdateItemsFromCart();
    const [stateQuantity, setStateQuantity] = useState(quantity);
    const removeFromCart = useRemoveItemFromCart();

    const updateQuantity = qty => {
        updateItemsFromCart({ id, quantity: qty })
    };

    const itemImage = client.image.helpers.imageForSize(
        image,
        {
            maxWidth: 300,
            maxHeight: 300
        },
    );

    return (
        <>
            <div>
                <div>
                    <img
                        src={ itemImage }
                        alt={ title }
                    />
                </div>
                <div>
                    <div>
                        <span>{ title }</span>
                        <div>
                            <div>
                                <div>
                                    <button
                                        aria-label='decrease quantity'
                                        onClick={ () => stateQuantity === 1 ? null : updateQuantity(stateQuantity - 1) }
                                    >
                                        -
                                    </button>
                                    <span
                                        name="quantity"
                                        min="1"
                                        type="number"
                                    >
                                        { stateQuantity }
                                    </span>
                                    <button
                                        aria-label='increase quantity'
                                        onClick={ () => updateQuantity(stateQuantity + 1) }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    { compareAtPrice && (
                                        <span>
                                            ${ parseFloat(compareAtPrice) * stateQuantity }
                                        </span>
                                    ) }
                                    <span>
                                        ${ parseFloat(price) * stateQuantity }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type='reset'
                        onClick={ () => removeFromCart(id) }
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    )
}

export default LineItem;