import { Link } from 'react-router-dom'
import classes from './SideNavigation.module.css'

interface SideNavigationProps {
}

function SideNavigation(props: SideNavigationProps) {    
    return <div className={classes.main}>
        <Link to='/shiftrota' className={classes.button}>Shift Rota</Link>
        <Link to='/somethingelse' className={classes.button}>Some other tab</Link>
    </div>
}

export default SideNavigation;