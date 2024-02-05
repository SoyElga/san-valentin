import React from 'react';

import CatSure from '../assets/cat_sure.jpg'
import { Button } from 'react-bootstrap';

function Sure(props) {
    return (
        <div className='content'>
            <img src={CatSure} alt="" />
            <h1>Estas segura??</h1>
            <div className='button-section'>
                <Button onClick={props.nextStage} variant="danger">Si estoy segura</Button>
                <Button onClick={props.confirmStage} variant="success">No siempre si quiero</Button>
            </div>
        </div>
    );
}

export default Sure;