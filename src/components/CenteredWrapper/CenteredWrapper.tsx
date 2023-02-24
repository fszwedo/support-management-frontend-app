import classes from './CenteredWrapper.module.css'
import Container from '@material-ui/core/Container'

interface WrapperProps {
    children: JSX.Element
}

function CenteredWrapper(props: WrapperProps) {
    return <Container className={classes.outerContainer}>
        <Container className={classes.innerContainer}>
            {props.children}
        </Container>
    </Container>    
}

export default CenteredWrapper;