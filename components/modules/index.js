import React from 'react';
import dynamic from 'next/dynamic';
import { PRISMIC_CONFIG } from '@config/prismic';

const Products = dynamic(() => import('./Products/Products'));
const Posts = dynamic(() => import('./Posts/Posts'));

export const Module = ({ module }) => getModule(module);

const getModule = module => {
    const { slice_type: type } = module;
    const { PRODUCTS, POSTS } = PRISMIC_CONFIG.SLICE_TYPES;

    switch(type) {
        case PRODUCTS:
            return <Products data={ module } />;
        case POSTS:
            return <Posts data={ module } />;
        default:
            return null;
    }
}