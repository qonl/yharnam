import React from 'react';
import styles from './Footer.module.scss';


const Footer = () => (
    <div className={ styles['footer'] }>
        <div className={ styles['footer__wrapper'] }>
            <h1 className="title">Footer</h1>
        </div>
    </div>
);

export default Footer;