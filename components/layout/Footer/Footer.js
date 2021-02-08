import React from 'react';
import styles from './Footer.module.scss';
import Newsletter from '@components/modules/Newsletter/Newsletter';


const Footer = ({ data }) => {
    return (
        <div className={ styles['footer'] }>
            <div className={ styles['footer__wrapper'] }>
                <h1 className="title">Footer</h1>
                {/*<Newsletter { ...data } />*/}
            </div>
        </div>
    );
}

export default Footer;