import React from 'react';
import { useState, useEffect } from 'react';

import CatReally from '../assets/cat_really.jpeg'
import { Button } from 'react-bootstrap';

function Expand(props) {
    const [noCount, setNoCount] = useState(0);
    const texts = [
        "Segura?? Te la vas a pasar muy bien",
        "No puedo creer que me digas que no",
        "Me estas rompiendo el corazón :(",
        "Sigues?? Que quieres que ocupe toda la pantalla??",
        "Bueno, una última oportunidad",
    ]
    useEffect(() => {
        if (noCount === 15) {
          props.nextStage();
        }
      }, [noCount]);

    var button_width = 100 + 20*noCount
    var button_height = 50 + 10*noCount

    return (
        <div className='content'>
            <img src={CatReally} alt="" />
            <h1>{texts[Math.floor(noCount / 3) % texts.length]}</h1>
            <div className='button-section'>
                <Button onClick={props.confirmStage} variant="success"style={{width:button_width, height: button_height}}>Si</Button>
                <Button variant="danger" onClick={()=>{setNoCount((noCount) => noCount + 1)}}>No</Button>
            </div>
        </div>
    );
}

export default Expand;