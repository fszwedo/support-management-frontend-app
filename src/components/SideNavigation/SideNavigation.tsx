import { Link } from 'react-router-dom'
import classes from './SideNavigation.module.css'
import { PATHS } from '../../constants'


interface SideNavigationProps {
}

function SideNavigation(props: SideNavigationProps) {    
    return <div className={classes.main}>
        <Link to={PATHS.SHIFTROTA} className={classes.button}>Shift Rota</Link>
        <Link to={PATHS.TESTPATH} className={classes.button}>Some other tab</Link>
    </div>
}

export default SideNavigation;