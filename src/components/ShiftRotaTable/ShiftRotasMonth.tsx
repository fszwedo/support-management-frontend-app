import ShiftEntryTile from './ShiftEntryTile'
import classes from './ShiftRotasMonth.module.css'
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import { useState, useEffect } from 'react'
import ShiftChangeModal from './ShiftChangeModal'

interface ShiftEntryMonthProps {
    shiftData: ShiftRotaEntry[],
    month: number, //0 - Jan, 11 - Dec
    year: number,
    renderCallback: Function
}

function ShiftEntryMonth(props: ShiftEntryMonthProps) {
    const [agents, setAgents] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [shiftChangeDay, setShiftChangeDay] = useState<string>();

    let fullDivContent: JSX.Element[] = [];
    const monthNames = ['theres no month with number 0! :)',"January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const extractAgentNames = () => {
        let agentsArray: string[] = [];
        for (let i = 0; i < props.shiftData.length; i++) {
            for (let j = 0; j < props.shiftData[i].agents.length; j++) {
                if (!agentsArray.includes(props.shiftData[i].agents[j])) agentsArray.push(props.shiftData[i].agents[j])
            }
        }
        setAgents(agentsArray);
    }

    const turnShiftChangeView = (day: string) => {
        setShiftChangeDay(day);
        setModalVisible(true);
    }

    const generateMonthTable = () => {
        const monthHeader = <div className={classes.monthHeader}>{monthNames[props.month]} {props.year}</div>
        fullDivContent.push(monthHeader);
        const daysInMonth = new Date(props.year, props.month, 0).getDate();

        //generate day and day name rows 
        const dayRow: JSX.Element[] = [];
        const dayNameRow: JSX.Element[] = [];
        
        for (let k = 0; k < daysInMonth; k++) {
            dayNameRow.push(<ShiftEntryTile key={`${k}`} shiftStart={0}>{new Date(props.year, props.month -1, k + 1).toLocaleString('en-us', { weekday: 'short' })}</ShiftEntryTile>)
        }
        fullDivContent.push(
            <div className={classes.rowWrapper}>
                <div className={classes.namePlaceholder} />{dayNameRow}
            </div>
        );

        for (let k = 0; k < daysInMonth; k++) {
            //we have to add +1 to month below, as months are calculated from 0 in this component in general
            dayRow.push(<ShiftEntryTile key={`${k}`} shiftStart={0} onClick={() => turnShiftChangeView(`${props.year}-${props.month}-${k + 1}`)} pulse={true}>{k + 1}</ShiftEntryTile>)
        }
        fullDivContent.push(
            <div className={classes.rowWrapper}>
                <div className={classes.namePlaceholder} />{dayRow}
            </div>
        );


        //generate agent rows
        for (let i = 0; i < agents.length; i++) {
            const agentRow: JSX.Element[] = [];
            for (let j = 0; j < daysInMonth; j++) {
                //I'm constructing the date of current tile to be in form YY-MM-DD
                let month: string | number = props.month;
                if (month < 10) month = '0' + month;
                //+ 1 below to match with the days numbers in the shift rota data
                let day: string | number = j + 1;
                if (day < 10) day = '0' + day;
                const date = `${props.year.toString().split('0')[1]}-${month}-${day}`
                const entry = props.shiftData.find(el => el.date === date)


                if (!entry) agentRow.push(<ShiftEntryTile key={`${agents[i]} ${date}`} shiftStart='nodata'></ShiftEntryTile>)
                else {
                    const agentIndex = entry!.agents.findIndex(el => el === agents[i])
                    if (entry!.hours[agentIndex]) {
                        const agentWorkingHours = entry!.hours[agentIndex].split('-');
                        agentRow.push(<ShiftEntryTile key={`${agents[i]} ${date}`} shiftStart={parseInt(agentWorkingHours[0])}></ShiftEntryTile>)
                    }
                    else agentRow.push(<ShiftEntryTile key={`${agents[i]} ${date}`} shiftStart={'nodata'}></ShiftEntryTile>)
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
        {modalVisible && shiftChangeDay && <ShiftChangeModal
            day={shiftChangeDay}
            closeHandler={() => {
                setModalVisible(false);
                props.renderCallback();
            }} />}
    </div>
}


export default ShiftEntryMonth;