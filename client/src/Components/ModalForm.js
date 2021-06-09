import React from 'react'

import {Modal} from 'react-bootstrap';

function ModalForm(props){

    return(
        <div className="cont">
            <Modal>
            <Modal.Header closeButton>
                 <Modal.Title>Add Question</Modal.Title>
            </Modal.Header>
            </Modal>
        </div>
    )
}

export default ModalForm