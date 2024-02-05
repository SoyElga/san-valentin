import React from 'react';

import CatHearts from '../assets/cat_hearts.png'
import Heart from '../assets/heart.png'

function Confirmation(props) {
    return (
        <div className='content'>
            <img src={CatHearts} alt="" />
            <h1><img src={Heart} alt="Heart" className='heart-icon'/>   Sabía que dirias que si   <img src={Heart} alt="Heart" className='heart-icon'/></h1>
        </div>
    );
}

export default Confirmation;