import React, { useCallback, useEffect, useState } from "react";

import {NavLink}     from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import axios         from "axios";

import {
    Box,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Paper,
    makeStyles,
    CircularProgress, Button,
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import AddEditUserDialog from './AddEditUserDialog';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: 50,
        width: '80%'
    },
    button: {
        marginRight: 10
    }
});
function  Users() {
    const navigate = useNavigate();
    const classes = useStyles();

    const [users, setUsers]     = useState([]);
    const [page, setPage]       = useState(1);
    const [loading, setLoading] = useState(true);
    const [count, setCount]     = useState(0);
    const [open, setOpen]       = useState(false);
    const [user, setUser]       = useState({});

    const getUsers = useCallback((page) => {
        axios.get(`https://reqres.in/api/users?page=${page}`)
            .then(res => {
                const userData = [...res.data.data];
                userData.forEach(item => {
                    item.name = item.first_name;
                    item.job = item.last_name;
                });
                setUsers(userData);
                setCount(res.data.total_pages);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        } else {
            getUsers(page);
        }

    }, [getUsers, navigate, page]);

    const handleChangePage = useCallback((event, currentPage) => {
        setPage(currentPage);
        getUsers(currentPage)
    }, [getUsers]);

    const closeDialog = useCallback(() => {
        setOpen(false)
    },[]);

    const addUser = useCallback((user) => {
        axios.post(`https://reqres.in/api/users`, user)
            .then(res => {
                getUsers(page);
                closeDialog();
            });
    }, [getUsers, closeDialog, page]);

    const saveUser = useCallback((user) => {
        axios.put(`https://reqres.in/api/users/${user.id}`, {name: user.name, job: user.job})
            .then(res => {
                getUsers(page);
                closeDialog();
            });
    }, [getUsers, closeDialog, page]);

    const removeUser = (id) => {
        axios.delete(`https://reqres.in/api/users/${id}`)
            .then(res => {
                getUsers(page);
            });
    };

    const openAddDialog = useCallback(() => {
        setOpen(true);
        setUser({});
    }, []);

    const openEditDialog = useCallback((user) => {
        setUser(user);
        setOpen(true);
    }, []);

    return (
        <>
            {loading ? <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={655}
                >
                    <CircularProgress color="secondary"/>
                </Box> :
                <Box>
                    <Box display='flex' justifyContent='center'>
                        <Box display='flex' justifyContent='end' width='80%' mt={5}>
                            <Button type="submit" color="primary" variant="outlined" onClick={openAddDialog}>Create User</Button>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <TableContainer component={Paper} className={classes.container}>
                            <Table aria-label="simple table" className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Avatar</TableCell>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index}
                                            </TableCell>
                                            <TableCell><NavLink to={`/User/${row.id}`}><Avatar alt={row.first_name}
                                                                                               src={row.avatar}/></NavLink></TableCell>
                                            <TableCell><NavLink
                                                to={`/User/${row.id}`}>{row.first_name} {row.last_name}</NavLink></TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>
                                                <Button type="submit" color="primary" variant="outlined"
                                                        className={classes.button} onClick={() => openEditDialog(row)}>Edit</Button>
                                                <Button type="submit" color="primary" variant="outlined" onClick={() => removeUser(row.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            }
            <AddEditUserDialog onClose={closeDialog} open={open} addUser={addUser} saveUserChanges={saveUser} editedUser={user}/>
            <Box mt={10} display='flex' justifyContent='center'>
                <Pagination count={count} shape="rounded" page={page} onChange={handleChangePage}/>
            </Box>
        </>
    );
}

export default Users;