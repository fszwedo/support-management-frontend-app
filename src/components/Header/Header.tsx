import { ReactComponent as ZoovuLogo } from '../../resources/zoovulogo.svg';
import classes from './Header.module.css'

interface HeaderProps {
}

function Header(props: HeaderProps) {    
    return <header className={classes.header}>
        <div className={classes.name}>Zoovu Support App </div>
        <div className={classes.logo}><ZoovuLogo/></div>     
    </header>
}


export default Header;