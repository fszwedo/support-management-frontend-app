interface BackdropProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

function Backdrop(props: BackdropProps) {    
    return <div className='backdrop' onClick={props.onClick}></div>
}

export default Backdrop;