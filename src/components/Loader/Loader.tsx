import classes from './Loader.module.css'
import { ReactComponent as ZoovuLogo } from '../../resources/zoovulogo.svg';

function Loader() {
    return <div className={classes.loaderContainer}>
        <ZoovuLogo className={classes.hourglass} />
    </div>
}

export default Loader;