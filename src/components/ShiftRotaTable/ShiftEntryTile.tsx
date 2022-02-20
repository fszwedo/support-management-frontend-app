import { MouseEventHandler } from 'react'
import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import classes from './ShiftEntryTile.module.css'
import { useState } from 'react';


interface ShiftEntryTileProps {
    shiftStart: number | string,
    date?: string,
    children?: number | string,
    onClick?: MouseEventHandler,
    pulse?: boolean
}

function ShiftEntryTile(props: ShiftEntryTileProps) {
    let className = 'noShift';

    if (props.shiftStart === 0) className = 'headerTile';
    else if (props.shiftStart < 14) className = 'morningShift';
    else if (props.shiftStart >= 14) className = 'afternoonShift';

    let fullClass = `${classes[className]} ${classes.tile}`;
    if (props.pulse) fullClass = fullClass + ` ${classes.pulse}`

    return <div
        className={fullClass}
        onClick={props.onClick}>
        {props.children}
    </div>
}

export default ShiftEntryTile;