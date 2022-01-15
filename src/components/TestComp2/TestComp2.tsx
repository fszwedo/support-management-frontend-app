interface TectComp2Props {
  onClick: Function;
}


function TestComp2 (props: TectComp2Props) {
  function cancelHandler () {
    props.onClick();
  }

  function confirmHandler () {
    props.onClick();
  }

    return <div className='modal'>
      <p>elo 420</p>
      <button onClick={cancelHandler}>Cancel</button>
      <button onClick={confirmHandler}>Confirm</button>
    </div>
  }

export default TestComp2;