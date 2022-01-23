import classes from './WelcomeScreen.module.css'

interface WelcomeScreenProps {
}

function WelcomeScreen(props: WelcomeScreenProps) {
    return <div className={classes.welcome}>
        <h2>Welcome in the Zoovu Support Application</h2>
        <p>This application is meant to make the Support Team's life easier :)</p>
        <p>It might lack some functionalities now - but great features are yet to come!</p>
        <p>In case of any questions - reach out to Phil.</p>

    </div>
}


export default WelcomeScreen;