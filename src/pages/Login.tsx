import classes from './Login.module.css'

import { useRef, useState } from 'react'

import Login from '../components/Login/Login'

interface LoginPageProps {
    submitHandler: Function
}

function LoginPage(props: LoginPageProps) {
    const [isRegisterActive, setisRegisterActive] = useState(false);


    return <Login submitHandler={props.submitHandler} openRegister={() => {setisRegisterActive(true)}}/>
}

export default LoginPage;