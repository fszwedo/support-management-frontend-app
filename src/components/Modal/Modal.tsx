import classes from './Modal.module.css'

interface ModalProps {
    children: JSX.Element
}

function Modal(props: ModalProps) {
    return <div id={'modal'} className={classes.modal}>                
        <div className={classes.modalBackground}/>
        <div className={classes.modalContent}>
            {props.children}
        </div>
    </div>
}

export default Modal