import { MouseEventHandler } from 'react'
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import classes from './ShiftEntryTile.module.css'
import { useState } from 'react';


interface ShiftEntryTileProps {
    tileConfig: string,
    date?: string,
    children?: string | number,
    onClick?: MouseEventHandler,
    pulse?: boolean
}

function ShiftEntryTile(props: ShiftEntryTileProps) {
    let className = 'noShift';   
    if (props.tileConfig === 'header') className = 'headerTile';  

    else if (parseInt(props.tileConfig.split('-')[0]) < 14) className = 'morningShift';
    else if (parseInt(props.tileConfig.split('-')[0]) >= 14) className = 'afternoonShift';

    let fullClass = `${classes[className]} ${classes.tile}`;
    if (props.pulse) fullClass = fullClass + ` ${classes.pulse}`;

    let workPeriods: string[] = [];
    let workPeriodsContainer: JSX.Element[] = [];
   
    if(className === 'morningShift' || className === 'afternoonShift') workPeriods = props.tileConfig.split(';')
    workPeriods.forEach(el => {
        console.log(el)
        workPeriodsContainer.push(<div className={classes.period}>{el}</div>);
    })
    return <div
        className={fullClass}
        onClick={props.onClick}>
        {props.children}
        {workPeriodsContainer}
    </div>
}

export default ShiftEntryTile;