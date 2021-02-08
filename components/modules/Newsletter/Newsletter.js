import React, { useState } from 'react';
import styles from './Newsletter.module.scss';
import { useForm } from 'react-hook-form';

const Newsletter = ({ mailchimp_url, submit_text, success_message, error_message }) => {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const {
        handleSubmit,
        register,
        watch,
        reset,
        errors
    } = useForm();

    const resetForm = (e) => {
        e.preventDefault();
        reset();
        setError(false);
        setSuccess(false);
        setSubmitting(false);
    }

    return (<div className={ styles['newsletter'] }></div>);
}

export default Newsletter;