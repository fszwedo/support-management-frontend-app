import classes from './ShiftChangeModal.module.css';
import { BACKEND_URL } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'

interface ShiftChangeModalProps {
    day: string,
    closeHandler: Function
}

function ShiftChangeModal(props: ShiftChangeModalProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shift, setShift] = useState<ShiftRotaEntry>()
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const submitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();
        let shiftData = shift;
        if (shiftData)
            for (let i = 0; i < (inputRefs.current.length); i++) {
                shiftData.hours[i] = inputRefs.current[i].value
            }

        console.log(shiftData);
        props.closeHandler();
    }

    const getShift = () => {
        fetch(`${BACKEND_URL}/api/shiftRota/${props.day}`)
            .then(response => {
                return response.json();
            }).then(data => {
                setShift(data);
                setIsLoading(false);
            });
    }

    const editHoursTable: JSX.Element[] = [];

    const generateAgentsAndHoursEditTable = () => {
        if (shift)
            for (let i = 0; i < (shift.agents.length); i++) {

                editHoursTable.push(
                    <div className={classes.control}>
                        <label htmlFor={shift.agents[i]}>{shift.agents[i]}</label>
                        <input type='text'
                            className={classes.input}
                            id={shift.agents[i]}
                            defaultValue={shift.hours[i]}
                            ref={el => (inputRefs.current[i] = el!)}></input>
                    </div>
                )
            }
    }

    useEffect(() => {
        getShift();
        console.log(props.day)
    }, [props])

    generateAgentsAndHoursEditTable();

    if (isLoading) {
        return <Modal>
            <Loader />
        </Modal>
    }
    else {
        return <Modal>
            <form className={classes.shiftChangeForm} onSubmit={submitHandler}>
                <div className={classes.header}>
                    <label id='date'>{new Date(shift?.date as string).toLocaleDateString('en-US')}</label>
                </div>
                {editHoursTable}
                <div className={classes.actions}>
                    <button className={classes.button}>Save</button>
                </div>
            </form>
        </Modal>

    }

}

export default ShiftChangeModal