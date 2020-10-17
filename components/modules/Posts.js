import React from 'react';
import Link from 'next/link';
import { hrefResolver, linkResolver } from '@config/prismic';
import { PrismicHTML } from '@util/prismicHelpers';

const Posts = ({ data }) => {
    return (
        <div className="posts">
            <h2>Posts</h2>
            { data.map(item => {
                const { data } = item;
                return (
                    <div key={ item.id } className="post">
                        <Link href={ hrefResolver(item) } as={ linkResolver(item) }>
                            <a>
                                <div dangerouslySetInnerHTML={{ __html: PrismicHTML(data.title) }}></div>
                            </a>
                        </Link>
                        <img src={ data.image.url } alt={ data.image.alt } />
                    </div>
                );
            })}
        </div>
    )
}

export default Posts;