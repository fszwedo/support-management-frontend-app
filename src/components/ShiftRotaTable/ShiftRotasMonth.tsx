import ShiftEntryTile from './ShiftEntryTile'
import classes from './ShiftRotasMonth.module.css'
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import { useState, useEffect } from 'react'

interface ShiftEntryMonthProps {
    shiftData: ShiftRotaEntry[]
    month: number //0 - Jan, 11 - Dec
    year: number
}

function ShiftEntryMonth(props: ShiftEntryMonthProps) {
    const [agents, setAgents] = useState<String[]>([]);
    let fullDivContent: JSX.Element[] = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const extractAgentNames = () => {
        let agentsArray: String[] = [];
        for (let i = 0; i < props.shiftData.length; i++) {
            for (let j = 0; j < props.shiftData[i].agents.length; j++) {
                if (!agentsArray.includes(props.shiftData[i].agents[j])) agentsArray.push(props.shiftData[i].agents[j])
            }
        }
        setAgents(agentsArray);
    }

    const generateMonthTable = () => {
        const monthHeader = <div className={classes.monthHeader}>{monthNames[props.month]} {props.year}</div>
        fullDivContent.push(monthHeader);
        const daysInMonth = new Date(props.year, props.month, 0).getDate();

        //generate day and day name rows 
        const dayRow: JSX.Element[] = [];       
        const dayNameRow: JSX.Element[] = [];

        for (let k = 0; k < daysInMonth; k++) {
            dayNameRow.push(<ShiftEntryTile key={`${k}`} shiftStart={0}>{new Date(props.year, props.month, k+1).toLocaleString('en-us', {  weekday: 'short' })}</ShiftEntryTile>)
        }
        fullDivContent.push(
            <div className={classes.rowWrapper}>
                <div className={classes.namePlaceholder}/>{dayNameRow}
            </div>
        );

        for (let k = 0; k < daysInMonth; k++) {
            dayRow.push(<ShiftEntryTile key={`${k}`} shiftStart={0}>{k+1}</ShiftEntryTile>)
        }
        fullDivContent.push(
            <div className={classes.rowWrapper}>
                <div className={classes.namePlaceholder}/>{dayRow}
            </div>
        );       
        
       

        //generate agent rows
        for (let i = 0; i < agents.length; i++) {
            const agentRow: JSX.Element[] = [];
            for (let j = 0; j < daysInMonth; j++) {
                const date = new Date(props.year, props.month, j + 1)
                const entry = props.shiftData.find(el => new Date(el.date).getTime() === date.getTime())

                if (!entry) agentRow.push(<ShiftEntryTile key={`${agents[i]} ${date}`} shiftStart='nodata'></ShiftEntryTile>)
                else {
                    const agentIndex = entry!.agents.findIndex(el => el === agents[i])
                    const agentWorkingHours = entry!.hours[agentIndex].split('-');
                    agentRow.push(<ShiftEntryTile key={`${agents[i]} ${date}`} shiftStart={parseInt(agentWorkingHours[0])}></ShiftEntryTile>)
                }
            }

            fullDivContent.push(
                <div className={classes.rowWrapper}>
                    <div className={classes.name}> {agents[i]} </div> {agentRow}
                </div>
            );
        }
    }

    useEffect(() => {
        extractAgentNames();
    }, [props])

    generateMonthTable();
    return <div className={classes.monthWrapper}>
        {fullDivContent}
    </div>
}


export default ShiftEntryMonth;