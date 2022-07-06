import classes from './Login.module.css'

import { useRef, useState } from 'react'

import BaseService from '../../app/baseService'
import { saveUserDataToLocalStorage } from '../../app/utils'
import CenteredWrapper from '../CenteredWrapper/CenteredWrapper'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'

interface LoginProps {
    submitHandler: Function
    openRegister: Function
}

function Login(props: LoginProps) {
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginHandler = async () => {
        setIsLoading(true);
        const service = new BaseService();
        try {
            const response = await service.post('/login', {
                email: loginRef.current!.value,
                password: passwordRef.current!.value
            })
            saveUserDataToLocalStorage(response);
            props.submitHandler();
            setIsLoading(false);
        }
        catch (err: any) {
            if (err.response) setError(err?.response.data.message);
            else setError('Application unavailable')
            setIsLoading(false);
        }
    }

    const loader = () => {
        if (isLoading) return <CircularProgress size="27px" color="secondary"/>
        else return 'Log In'
    }

    return (<Container className={classes.container}>
    <CenteredWrapper>
        <form className={classes.form} >
            <Typography variant='h5'>Welcome in Zoovu Support App</Typography>
            <TextField
                label="Login"
                variant="outlined"
                color="primary"
                type="email"
                name="email"
                InputLabelProps={{
                    style: { color: '#fff' },
                }}
                InputProps={{
                    classes: {
                        notchedOutline: classes['input-border'],
                    },
                }}
                className={classes.input}
                inputRef={loginRef}
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                color="primary"
                InputLabelProps={{
                    style: { color: '#fff' },
                }}
                InputProps={{
                    classes: {
                        notchedOutline: classes['input-border'],
                    },
                }}
                className={classes.input}
                inputRef={passwordRef}
            />
            <Typography
                color='error'
                variant='subtitle2'
            >
                {error}
            </Typography>
            <Button
                type="button"
                className={classes.button}
                variant="contained"
                size="large"
                onClick={loginHandler}>             
                {loader()}
            </Button>
            <Link                
                variant='subtitle2'
                onClick={() => {props.openRegister()}}
            >No account? Register yourself!</Link>
        </form>
    </CenteredWrapper>
    </Container>
    )
}

export default Login;