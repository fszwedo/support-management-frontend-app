import classes from './Login.module.css'

import { useRef, useState } from 'react'

import Login from '../components/Login/Login'
import Register from '../components/Register/Register'

interface LoginPageProps {
    submitHandler: Function
}

function LoginPage(props: LoginPageProps) {
    const [isRegisterActive, setisRegisterActive] = useState(false);

    return (<div>
        {isRegisterActive
            ? <Register onFinish={() => {setisRegisterActive(false)}}/>
            : <Login 
            submitHandler={props.submitHandler} 
            openRegister={() => { setisRegisterActive(true) }} 
            />
        }
    </div>
    )
}

export default LoginPage;