import classes from './ShiftChangeModal.module.css';
import { useState, useEffect, useRef } from 'react';
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import BaseService from '../../app/baseService'
import { convertDateToYYMMDD } from '../../utilities/dateConverter'

import Button from '@material-ui/core/Button'

interface ShiftChangeModalProps {
    day: string,
    closeHandler: Function
}

function ShiftChangeModal(props: ShiftChangeModalProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shift, setShift] = useState<ShiftRotaEntry>()
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const day = convertDateToYYMMDD(props.day)

    const submitHandler: React.FormEventHandler = async (event) => {
        const service = new BaseService();
        event.preventDefault();
        let shiftData = shift;
        if (shiftData) {
            for (let i = 0; i < (inputRefs.current.length); i++) {
                shiftData.hours[i] = inputRefs.current[i].value
            }
            shiftData.date = day;

            await service.put('/shiftRota', shiftData);
        }
        props.closeHandler();
    }

    const getShift = async () => {
        const service = new BaseService();
        const response = await service.get(`/shiftRota/${day}`);
        setShift(response.data);
        setIsLoading(false);
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
                    <label id='date'>{new Date(props.day).toLocaleDateString('en-US')}</label>
                </div>
                {editHoursTable}
                <div className={classes.actions}>
                    <Button 
                    className={`${classes.button} ${classes.save}`}
                    onClick = {submitHandler}
                    >Save</Button>
                    <Button 
                    className={`${classes.button} ${classes.close}`}
                    onClick = {() => {props.closeHandler()}}
                    >Close</Button>
                </div>
            </form>
        </Modal>

    }

}

export default ShiftChangeModal