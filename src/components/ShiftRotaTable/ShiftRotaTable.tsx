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
    let table: JSX.Element[] = [];

    const getShifts = () => {
        fetch(`${BACKEND_URL}api/shiftRota`)
            .then(response => {
                return response.json();
            }).then(data => {
                setShifts(data.sort((firstEl: ShiftRotaEntry, secondEl: ShiftRotaEntry) => new Date(firstEl.date).getTime() - new Date(secondEl.date).getTime()));
                setIsLoading(false);
            });
    }


    const generateMonthTables = () => {
        const startDateMonth = new Date().getMonth();
        const endDateMonth = new Date(shifts[shifts.length - 1].date.toString()).getMonth()
        const currentYear = new Date().getFullYear();
        console.log(startDateMonth, shifts[shifts.length - 1].date.toString())
        const monthTables: JSX.Element[] = [];
        for (let i = startDateMonth; i <= endDateMonth; i++) monthTables.push(<ShiftEntryMonth key={`${i}-${currentYear}`} shiftData={shifts} month={i} year={currentYear} />)
        return monthTables;
    }

    useEffect(() => {
        getShifts();

    }, [])
    table = generateMonthTables();
    console.log(table)
    if (isLoading && shifts.length < 2) {
        return <div className={classes.loaderContainer}>
            <div className={classes.hourglass}></div>
        </div>
    }
    else {
        return <div className={classes.table}>
            {table}
        </div>
    }


}

export default ShiftRotaTable;