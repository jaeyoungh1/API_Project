import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { SignUpPage } from './SignupFormPage'

export default function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button id='login-nav' onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpPage />
                </Modal>
            )}
        </>
    )
}
