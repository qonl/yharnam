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
                { data.items.map(item => {
                    const {
                        post: {
                            data: {
                                title,
                                image,
                                date,
                            }
                        }
                    } = item;

                    return (
                        <div key={ item.post.uid } className={ styles['posts__post-card'] }>
                            <Link href={ hrefResolver(item.post) } as={ linkResolver(item.post) }>
                                <a>
                                    <RichText render={ title } />
                                </a>
                            </Link>
                            <span>{ date }</span>
                            <img src={ image.url } alt={ image.alt } />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Posts;