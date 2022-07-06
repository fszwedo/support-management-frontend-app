import classes from './UserInfo.module.css'
import { getUserFromLocalStorage } from '../../app/utils'
import BaseService from '../../app/baseService'
import { useState, useEffect } from 'react'
import { User } from '../../models/User'
import Loader from '../Loader/Loader'

import {
    Container,
    Button

} from '@material-ui/core'

interface UserInfoProps {
}

function UserInfo(props: UserInfoProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<User | undefined> ();

    const user = getUserFromLocalStorage();

    const getMe = async () => {
        const service = new BaseService();
        setUserData((await service.get(`/users/me?id=${user.userId}`)).data);        
        setIsLoading(false);
    }

    useEffect(() => {
        getMe();
    }, [])

    return (isLoading ? <Loader/>
        :    <Container>{userData!.name}</Container>)
}

export default UserInfo