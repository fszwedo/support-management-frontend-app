import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

import classes from './Login.module.css'

import { useRef, useState } from 'react'

import BaseService from '../app/baseService'
import { saveUserDataToLocalStorage } from '../app/utils'
import { Typography } from '@material-ui/core'

interface LoginPageProps {
    submitHandler: Function
}

function LoginPage(props: LoginPageProps) {
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState();

    const loginHandler = async () => {
        const service = new BaseService();
        try {
            const response = await service.post('/login', {
                email: loginRef.current!.value,
                password: passwordRef.current!.value
            })
            saveUserDataToLocalStorage(response);
            props.submitHandler();
        }
        catch (err: any) {
            setError(err?.response.data.message);
        }
    }

    return (<Container className={classes.outerContainer}>
        <Container className={classes.innerContainer}>
            <TextField
                label="Login"
                variant="outlined"
                color="primary"
                type="email"
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
                label="Password"
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
            >
                {error}
            </Typography>
            <Button
                className={classes.button}
                variant="contained"
                size="large"
                onClick={loginHandler}>
                Log in</Button>
        </Container>
    </Container>
    )
}

export default LoginPage;