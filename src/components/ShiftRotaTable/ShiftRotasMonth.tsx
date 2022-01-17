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

    const extractAgentNames = () => {
        let agentsArray: String[] = [];
        // console.log(props.shiftData[0].agents)
        // agentsArray = props.shiftData[0].agents
        for (let i = 0; i < props.shiftData.length; i++) {
            for (let j = 0; j < props.shiftData[i].agents.length; j++) {
                if (!agentsArray.includes(props.shiftData[i].agents[j])) agentsArray.push(props.shiftData[i].agents[j])
            }
        }
        setAgents(agentsArray);
    }

    
    
    const generateMonthTable = () => {
        const daysInMonth = new Date(props.year, props.month, 0).getDate();
        console.log(agents)
        for (let i = 0; i < agents.length; i++) {
            const agentRow: JSX.Element[] = [];
            for (let j = 0; j < daysInMonth; j++) {
                const date = new Date(props.year, props.month, j)
                const entry = props.shiftData.find(el => new Date(el.date).getTime() === date.getTime())
                
                if (!entry) agentRow.push(<ShiftEntryTile key={`${agents[i]} ${date}`} shiftStart={0}></ShiftEntryTile>)
                else {
                    const agentIndex = entry!.agents.findIndex(el => el === agents[i])
                    const agentWorkingHours = entry!.hours[agentIndex].split('-');
                    console.log(agentWorkingHours)
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