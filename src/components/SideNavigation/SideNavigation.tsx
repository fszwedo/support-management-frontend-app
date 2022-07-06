import { Link } from 'react-router-dom'
import classes from './SideNavigation.module.css'
import { PATHS } from '../../constants'


interface SideNavigationProps {
    onLogout: any
}

function SideNavigation(props: SideNavigationProps) {
    return <div className={classes.container}>
        <div className={classes.main}>
            <Link to={PATHS.SHIFTROTA} className={classes.button}>Shift Rota</Link>
        </div>
        <div>
            <Link to={PATHS.ME} className={classes.logout}>My Info</Link>
            <Link to={'/'} className={classes.logout} onClick={props.onLogout}>Log out</Link>
        </div>
    </div>
}

export default SideNavigation;