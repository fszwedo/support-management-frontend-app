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
    Typography, 
    Grid
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
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.firstRow}>
                    <Typography align='center' variant='h5'>Your info:</Typography>
                </Grid>
                <Grid item xs={6} className={classes.row}>
                    Name: 
                </Grid>
                <Grid item xs={6} className={classes.row}>
                    {userData!.name}
                </Grid>

                <Grid item xs={6} className={classes.row}>
                    Email:
                </Grid>
                <Grid item xs={6} className={classes.row}>
                    {userData!.email}
                </Grid>

                <Grid item xs={6} className={classes.row}>
                    Permission level:
                </Grid>
                <Grid item xs={6} className={classes.row}>
                    {defineUserType(userData!.type)}
                </Grid>

                <Grid item xs={6} className={classes.row}>
                    User since:
                </Grid>
                <Grid item xs={6} className={classes.row}>
                    {new Date(userData!.created).toLocaleDateString('en-GB')}
                </Grid>
            </Grid>
        </CenteredWrapper>)
}

export default UserInfo