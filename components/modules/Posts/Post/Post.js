import React from 'react';
import styles from './Post.module.scss';
import { RichText } from 'prismic-reactjs';

const Post = ({ post, preview }) => {
    const { data } = post;
    return (<>
        { preview && <div>You're previewing</div> }
        <div className={ styles['post'] }>
            <RichText render={ data.title } />
            <p>{ data.meta_description }</p>
            <img src={ data.image.url } alt={ data.image.alt } />
            <RichText className={ styles['post'] } render={ data.content }></RichText>
        </div>
    </>)
}

export default Post;