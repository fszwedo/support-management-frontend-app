import classes from './ShiftRotaTable.module.css'
import { BACKEND_URL } from '../../constants'
import { useState, useEffect } from 'react'
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import ShiftEntryMonth from './ShiftRotasMonth'
import Loader from '../Loader/Loader'
import convertDate from '../../utilities/dateConverter'
import BaseService from '../../app/baseService'
import axios from 'axios';


interface ShiftRotaTableProps {
}

function ShiftRotaTable(props: ShiftRotaTableProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [shifts, setShifts] = useState<[ShiftRotaEntry]>([{ date: '', agents: [''], hours: [''] }]);
    let table: JSX.Element[] = [];

    const getShifts = async () => {
        const service = new BaseService();
        const data = (await service.get('/shiftRota')).data;
        console.log(data)
        setShifts(data.sort((firstEl: ShiftRotaEntry, secondEl: ShiftRotaEntry) => {
            //split the date to get subelements
            return convertDate(firstEl.date) - convertDate(secondEl.date)
        }))

        setIsLoading(false);
    }

    const generateMonthTables = () => {
        //+ 1 to compensate for the fact that getMonth returns values 0-11
        const startDateMonth = new Date().getMonth() + 1;
        const endDate = shifts[shifts.length - 1].date.split('-')
        const endDateMonth = new Date(Date.UTC(parseInt(endDate[0]), parseInt(endDate[1]), parseInt(endDate[2]))).getMonth() + 1
        const currentYear = new Date().getFullYear();

        const monthTables: JSX.Element[] = [];
        for (let i = startDateMonth; i <= endDateMonth; i++) monthTables.push(<ShiftEntryMonth key={`${i}-${currentYear}`} shiftData={shifts} month={i} year={currentYear} renderCallback={() => setIsLoading(true)} />)
        table = monthTables;
    }

    useEffect(() => {
        getShifts();
    }, [isLoading])

    generateMonthTables();

    if (isLoading && shifts.length < 2) {
        return <Loader />
    }
    else {
        return <div className={classes.table}>
            {table}
        </div>
    }
}

export default ShiftRotaTable;