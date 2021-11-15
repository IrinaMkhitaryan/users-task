import React, { useCallback, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Button
} from "@material-ui/core";

function AddEditUserDialog(props) {
    const {
        onClose,
        open = false,
        addUser,
        editedUser,
        saveUserChanges
    } = props;
    const [user, setUser]  = useState({});

    useEffect(() => {
        setUser(editedUser);
    }, [editedUser]);
    const handleSelectChange = useCallback(event => {
        switch (event.target.name) {
            case 'name':
                setUser(
                    {
                        ...user,
                        name: event.target.value
                    });
                break;
            case 'job':
                setUser(
                    {
                        ...user,
                        job: event.target.value
                    });
                break;
            default:
                break;
        }
    }, [setUser, user]);

    const createUser = useCallback(() => {
        addUser(user);
        setUser({});
    }, [user, addUser]);

    const saveUser = useCallback(() => {
        saveUserChanges(user);
        setUser({});
    }, [user]);

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogContent>
                <Box mt={2}>
                    <TextField label="Name"
                               variant="outlined"
                               type="text"
                               name="name"
                        onChange={handleSelectChange}
                               value={user.name}
                    />
                </Box>
                <Box mt={2} mb={2}>
                    <TextField label="Job"
                               type="text"
                               variant="outlined"
                               name="job"
                        onChange={handleSelectChange}
                               value={user.job}

                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="outlined" onClick={user.id ? saveUser : createUser}>{user.id ? 'Edit' : 'Save'}</Button>
            </DialogActions>
        </Dialog>
    )
}
export default AddEditUserDialog;