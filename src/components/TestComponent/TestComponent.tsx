import {useState} from 'react'
import TestComp2 from '../TestComp2/TestComp2';
import Backdrop from '../TestComp2/Backdrop'

interface TestComponentProps {
    text:String;
}

function TestComponent(props: TestComponentProps) {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  function buttonHandler () {
    setModalIsOpen(!modalIsOpen);
  }
  
    return (
      <div className="App">
        {props.text}
        <button onClick={buttonHandler}>button</button>
        {modalIsOpen && <TestComp2 onClick= {buttonHandler}/>}
        {modalIsOpen && <Backdrop onClick= {buttonHandler}/>}
      </div>      
    )
  }
  
  export default TestComponent;
  