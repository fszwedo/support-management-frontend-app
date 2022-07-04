import classes from './Register.module.css'

import { useRef, useState } from 'react'

import BaseService from '../../app/baseService'
import { saveUserDataToLocalStorage } from '../../app/utils'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PasswordStrengthBar from 'react-password-strength-bar';

interface RegisterProps {
}

interface PasswordFeedback {
    warning?: string | undefined;
    suggestions?: string[] | undefined;
  }

function Register (props: RegisterProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState('');
    const passwordRepeatRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [passwordScore, setPasswordScore] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState<PasswordFeedback>();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const registerHandler = async () => {
        setIsLoading(true);
        const service = new BaseService();
        try {
            console.log(passwordFeedback)
            if (passwordScore < 3) {
                if(passwordFeedback?.warning) throw new Error(passwordFeedback?.warning) 
                else throw new Error('Password is not complex enough') 
            }
            const response = await service.post('/register', {
                email: emailRef.current!.value,
                password: password,
                name: nameRef.current!.value,
            })
            setIsLoading(false);
        }
        catch (err: any) {            
            if (err.response) setError(err?.response.data.message);
            else if (err.message) setError(err.message);
            else setError('Registration failed.')
            setIsLoading(false);
        }
    }

    const loader = () => {
        if (isLoading) return <CircularProgress size="27px" color="secondary"/>
        else return 'Register'
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
      }

    return (<Container className={classes.outerContainer}>
        <form className={classes.innerContainer}>
            <Typography variant='h5'>Register in Zoovu Support App</Typography>
            <TextField
                label="Full Name"
                variant="outlined"
                color="primary"
                type="name"
                name="name"
                InputLabelProps={{
                    style: { color: '#fff' },
                }}
                InputProps={{
                    classes: {
                        notchedOutline: classes['input-border'],
                    },
                }}
                className={classes.input}
                inputRef={nameRef}
            />
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
                inputRef={emailRef}
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
                onChange={handlePasswordChange}
            />
            <PasswordStrengthBar className={classes.strengthbar} password={password}
            onChangeScore={(score, feedback) => {
                setPasswordScore(score);
                setPasswordFeedback(feedback);
            }}/>
            <TextField
                name="repeatpassword"
                label="Repeat Password"
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
                inputRef={passwordRepeatRef}
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
                onClick={registerHandler}>             
                {loader()}
            </Button>
        </form>
    </Container>
    )
}

export default Register