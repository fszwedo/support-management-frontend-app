import { Link } from 'react-router-dom'
import classes from './SideNavigation.module.css'

interface SideNavigationProps {
}

function SideNavigation(props: SideNavigationProps) {    
    return <div className={classes.main}>
        <Link to='/shiftrota' className={classes.link}> Shift Rota</Link>
        <Link to='/somethingelse' className={classes.link}> Something else</Link>
    </div>
}

export default SideNavigation;