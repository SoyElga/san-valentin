import { useState } from 'react'
import './App.css'

import FirstInvitation from './views/FirstInvitation'
import Sure from './views/Sure'
import Expand from './views/Expand'
import TicTacToe from './views/TicTacToe'

import Confirmation from './views/Confirmation'
import './views/standard_style.css'

function App() {
  const [stage, setStage] = useState(0)
  const totalViews = 4;

  const nextStage = () => {
    if (stage < totalViews) {
      setStage(stage + 1);
    }
    console.log(stage)
  };

  const confirmStage = () => {
    setStage(totalViews);
  }

  const seleccionarVista = () => {
    switch(stage) {
      case 0:
        return <FirstInvitation nextStage={nextStage} confirmStage={confirmStage} />;
        case 1:
          return <Sure nextStage={nextStage} confirmStage={confirmStage} />;
          case 2:
            return <Expand nextStage={nextStage} confirmStage={confirmStage} />;
            case 3:
              return <TicTacToe nextStage={nextStage} confirmStage={confirmStage} />;
              case totalViews:
                return <Confirmation/>;
      default:
        return <Confirmation />;
    }
  };
  return (
    <>
    <div>
      {seleccionarVista()}
      {/* <Expand></Expand> */}
    </div>
    </>
  )
}

export default App
