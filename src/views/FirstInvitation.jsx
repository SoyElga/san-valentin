import React from 'react';

import CatInvitation from '../assets/cat_invitation.jpeg'
import Heart from '../assets/heart.png'
import { Button } from 'react-bootstrap';

function FirstInvitation(props) {
    return (
        <div className='content'>
            <img src={CatInvitation} alt="" />
            <h1>Quieres ser mi San Valentin??</h1>
            <div className='button-section'>
                <Button onClick={props.confirmStage} variant="success">Si <img src={Heart} alt="Heart" className='heart-icon'/></Button>
                <Button onClick={props.nextStage} variant="danger">No</Button>
            </div>
        </div>
    );
}

export default FirstInvitation;<h1>Quieres ser mi San Valentin??</h1>