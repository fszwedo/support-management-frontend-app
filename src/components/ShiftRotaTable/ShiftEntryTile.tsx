import { ShiftRotaEntry } from '../../models/ShiftRotaData'
import classes from './ShiftEntryTile.module.css'


interface ShiftEntryTileProps {
    shiftStart: number | string,
    children?: number | string
}

function ShiftEntryTile(props: ShiftEntryTileProps) {  
    if(props.shiftStart === 0) return <div className={`${classes.headerTile} ${classes.tile}`}>{props.children}</div>    
    
    if(props.shiftStart < 14) return <div className={`${classes.morningShift} ${classes.tile}`}></div>

    if(props.shiftStart >= 14) return <div className={`${classes.afternoonShift} ${classes.tile}`}></div>

    return <div className={`${classes.noShift} ${classes.tile}`}></div>
}

export default ShiftEntryTile;