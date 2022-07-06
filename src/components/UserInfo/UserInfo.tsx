import classes from './UserInfo.module.css'
import { getUserFromLocalStorage } from '../../app/utils'
import BaseService from '../../app/baseService'
import { useState, useEffect } from 'react'
import { User } from '../../models/User'
import Loader from '../Loader/Loader'
import CenteredWrapper from '../CenteredWrapper/CenteredWrapper'

import { UserType } from '../../models/User'

import {
    Container,
    Button,
    Typography
} from '@material-ui/core'

interface UserInfoProps {
}

function UserInfo(props: UserInfoProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<User | undefined>();

    const user = getUserFromLocalStorage();

    const getMe = async () => {
        const service = new BaseService();
        setUserData((await service.get(`/users/me?id=${user.userId}`)).data);
        setIsLoading(false);        
    }

    const defineUserType = (type: number) => {
        if(type === UserType.User) return 'User'
        if(type === UserType.Admin) return 'Admin'
    }

    useEffect(() => {
        getMe();        
    }, [])

    return (isLoading ? <Loader /> :
        <CenteredWrapper>
            <Container className={classes.container}>
                <Typography variant='h6'>
                    Your info:
                </Typography>
                <Container className={classes.row}>
                    Name: {userData!.name}
                </Container>
                <Container className={classes.row}>
                    Email: {userData!.email}
                </Container>
                <Container className={classes.row}>
                    Permission level: {defineUserType(userData!.type)}
                </Container>
                <Container className={classes.row}>
                    User since: {new Date(userData!.created).toLocaleDateString('en-GB')}
                </Container>
            </Container>
        </CenteredWrapper>)
}

export default UserInfo