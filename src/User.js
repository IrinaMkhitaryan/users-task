import React, { useCallback, useEffect, useState } from "react";
import {
    Avatar,
    Box,
    List,
    ListItem,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import {useParams} from "react-router-dom";
import axios       from "axios";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    userInfo: {
        width: 500
    }
}));

function  User() {
    const classes = useStyles();
    const params = useParams();

    const [user, setUser] = useState({});
    const [id, setId]     = useState(params.id);

    const getUser = useCallback(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then(res => {
                setUser(res.data.data);
            });
    }, [id]);

    useEffect(() => {
        getUser();
    }, [id, getUser]);

    return (
        <Box display='flex' justifyContent='center' mt={2}>
            <Box><Avatar alt={user.first_name} src={user.avatar} className={classes.large}/></Box>
            <Box p={5}>
                <List disablePadding dense className={classes.userInfo}>
                    <ListItem>
                        <Box width='50%'
                             fontSize={14}
                             fontWeight={900}>
                            <Box variant='subtitle2' component='span'>
                                id
                            </Box>
                        </Box>
                        <Box maxWidth='100%' fontSize={14}
                             textAlign='right'>
                            {user.id}
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box width='50%' fontSize={14}
                             fontWeight={900}>
                            <Typography variant='subtitle2' component='span'>
                                email
                            </Typography>
                        </Box>
                        <Box maxWidth='100%' fontSize={14}
                             textAlign='right'>
                            {user.email}
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box width='50%' fontSize={14}
                             fontWeight={900}>
                            <Typography variant='subtitle2' component='span'>
                                First Name
                            </Typography>
                        </Box>
                        <Box maxWidth='100%' fontSize={14}
                             textAlign='right'>
                            {user.first_name}
                        </Box>
                    </ListItem>
                    <ListItem className={classes.orderInfo}>
                        <Box width='50%' fontSize={14}
                             fontWeight={900}>
                            <Typography variant='subtitle2' component='span'>
                                Last Name
                            </Typography>
                        </Box>
                        <Box maxWidth='100%' fontSize={14}
                             textAlign='right'>
                            {user.last_name}
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}
export default User;