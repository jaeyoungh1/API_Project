import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { SignUpPage } from './SignupFormPage'

export default function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <div id='login-nav-wrapper'>
                <div id='login-nav' className='login-nav-signup' onClick={() => setShowModal(true)}>Sign Up</div>
        </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpPage />
                </Modal>
            )}
        </>
    )
}
