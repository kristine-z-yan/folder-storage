import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Box, Card, CardActions, CardContent, IconButton, Typography} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from '@mui/icons-material/Reply';
import {Dispatch} from "@reduxjs/toolkit";
import {storageActions} from "../features/storage/storageSlice";
import {toast, ToastContainer} from "react-toastify";

const Trash:React.FC = () => {
    const backButton = '/';
    const trash = useSelector((state:RootState) => state.state.trash);
    const storage = useSelector((state:RootState) => state.state.storage);
    const errorMessage = useSelector((state:RootState) => state.state.errorMessage);
    const successMessage = useSelector((state:RootState) => state.state.successMessage);
    const dispatch = useDispatch<Dispatch<any>>();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setShowToast(true);
            toast.error(errorMessage);
        }
        if (successMessage) {
            setShowToast(true);
            toast.success(successMessage);
        }
        dispatch(storageActions.clearMessages())
    }, [errorMessage, successMessage, dispatch])

    let emptyText = '';
    let trashItems: JSX.Element[] = [];

    if (trash.length > 0) {
        trashItems = trash.map((item, index) => {
            let icon;
            if (item.type === 'folder') {
                icon =  <FolderIcon color='primary' sx={{ fontSize: '30px'}} />;
            } else {
                icon = <ArticleIcon color='success' sx={{ fontSize: '30px'}} />
            }

            return (
                <Grid item xs={2} key={index}>
                    <Card sx={{ maxWidth: 130, margin: '10px' }}>
                        <CardContent sx={{ padding: 0, textAlign: 'center' }}>
                            {icon}
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {item.name}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center'}}>
                            <IconButton>
                                <ReplyIcon color='primary' onClick={() => recoverItem(item.path, item.type)}/>
                            </IconButton>
                            <IconButton onClick={() => deleteItem(index)}>
                                <DeleteIcon color='error'/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            )
        })
    } else {
        emptyText = 'Your trash is empty'
    }

    const deleteItem = (index: number) => {
       dispatch(storageActions.deleteItem({index}))
    }

    const recoverItem = (path: string, type: "folder" | "file") => {
        let route = path.split('-').slice(0, -1);
        let content = storage;
        if (route.length > 0) {
            route.map((name: string) => {
                let folder = content.find((el:any) => el.name === name);
                if (folder && folder.type === 'folder') {
                    content = folder.children;
                } else {
                    setShowToast(true);
                    toast.error("This item can not be recovered!");
                    return false
                }
                return content
            })
        }
        dispatch(storageActions.recoverItem({ path, type }))
    }

    return (
        <>
            { showToast &&  <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> }
            <Grid container spacing={2} >
                <Grid item xs={2}>
                    <Link to={backButton}>Back</Link>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        width: 800,
                        height: 600,
                        border: '1px solid lightgrey',
                        margin: '20px auto'
                    }}>
                        <Grid container>
                            {emptyText}
                            {trashItems}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Trash;