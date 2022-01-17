import classes from './ShiftRotaTable.module.css'
import { BACKEND_URL } from '../../constants'
import { useState, useEffect } from 'react'
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import ShiftEntryMonth from './ShiftRotasMonth'

interface ShiftRotaTableProps {
}

function ShiftRotaTable(props: ShiftRotaTableProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [shifts, setShifts] = useState<[ShiftRotaEntry]>([{ date: '', agents: [''], hours: [''] }]);

    const getShifts = () => {
        fetch(`${BACKEND_URL}api/shiftRota`)
            .then(response => {
                return response.json();
            }).then(data => {
                setShifts(data);
            });
    }

    const getDateRange = () => {
        const startDate = new Date(shifts[0].date.toString());
        const endDate = new Date(shifts[shifts.length - 1].date.toString())
        return [startDate, endDate]
    }

    useEffect(() => {
        getShifts();
        setIsLoading(false);
    }, [])

    if (isLoading && shifts.length < 2) {
        return <div>LOADING...</div>
    }
    else {
        return <div className={classes.table}>
            <ShiftEntryMonth shiftData={shifts} month={0} year={2022} />
        </div>
    }


}

export default ShiftRotaTable;