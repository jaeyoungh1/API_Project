import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {EditABooking} from '../EditBookingForm/EditBookingForm'


function EditBookingModal({bookingId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id='login-nav-wrapper'>
                <div id='edit-booking-button' className='login-nav-login' onClick={() => setShowModal(true)}>Edit Booking</div>
            </div >
            {showModal && (
                <Modal onClose={() => setShowModal(false)} onLoadedData={() => setShowModal(false)}>
                    <EditABooking bookingId={bookingId} />
                </Modal>
            )}
        </>
    );
}

export default EditBookingModal;