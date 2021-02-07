import React from 'react';
import Link from 'next/link';
import { hrefResolver, linkResolver } from '@config/prismic';
import { RichText } from 'prismic-reactjs';
import styles from './Posts.module.scss';

const Posts = ({ data }) => {
    return (
        <div className={ styles['posts'] }>
            <h2>Posts</h2>
            <div className={ styles['posts__wrapper'] }>
                { data.map(item => {
                    const { data } = item;
                    return (
                        <div key={ item.id } className={ styles['posts__post-card'] }>
                            <Link href={ hrefResolver(item) } as={ linkResolver(item) }>
                                <a>
                                    <RichText render={ data.title } />
                                </a>
                            </Link>
                            <img src={ data.image.url } alt={ data.image.alt } />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Posts;