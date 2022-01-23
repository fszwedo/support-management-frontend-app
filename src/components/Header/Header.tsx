import { ReactComponent as ZoovuLogo } from '../../resources/zoovulogo.svg';
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import { PATHS } from '../../constants'

interface HeaderProps {
}

function Header(props: HeaderProps) {
    return <header className={classes.header}>
        <Link to={PATHS.HOME} className={classes.name}>
            <div>Zoovu Support App</div>
        </Link>
        <a href={PATHS.TIGER}>
            <div className={classes.logo}><ZoovuLogo /></div>
        </a>
    </header>
}


export default Header;