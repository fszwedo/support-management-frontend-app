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
            <Link to={PATHS.TESTPATH} className={classes.button}>Some other tab</Link>
        </div>
        <Link to={'/'} className={classes.logout} onClick={props.onLogout}>Log out</Link>
    </div>
}

export default SideNavigation;