import * as React from "react";
import {
    Link,
} from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {storageActions} from "./storageSlice";
import {RootState} from "../../app/store";

type Folder = {
    path: string
    name: string,
    type: 'folder',
    children: Array<Folder | File>
}

type File = {
    path: string
    name: string,
    type: 'file',
    data: string,
}

const Storage: React.FC<{content: Array<Folder | File>}> = (props) => {
    const dispatch = useDispatch<Dispatch<any>>();

    let folders: JSX.Element[] = [];
    let files: JSX.Element[] = [];
    let emptyText = '';
    const storage = useSelector((state:RootState) => state.state.storage);

    const moveToTrash = (path: string, type: 'folder' | 'file') => {
        dispatch(storageActions.moveToTrash({path, type}));
        // console.log(file, storage);
    }

    if (props.content.length > 0 ) {
        for (const e of props.content) {
            if (e.type === 'folder') {
                folders.push(
                <ListItem disablePadding key={`folder-${e.name}`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <FolderIcon color='primary'/>
                        </ListItemIcon>
                        <Link to={`/folders/${e.path}`} style={{'width': '100%'}}>
                            <ListItemText primary={e.name} sx={{ display: 'inline-block' }}/>
                        </Link>
                        <IconButton onClick={() => moveToTrash(e.path, 'folder')}>
                            <DeleteIcon color='error'/>
                        </IconButton>
                    </ListItemButton>
                </ListItem>)
            } else {
                files.push(
                    <ListItem disablePadding key={`file-${e.name}`}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ArticleIcon color='success'/>
                            </ListItemIcon>
                            <Link to={`/files/${e.path}`} style={{'width': '100%'}}>
                                <ListItemText primary={e.name} sx={{ display: 'inline-block' }}/>
                            </Link>
                            <IconButton onClick={() => moveToTrash(e.path, 'file')}>
                                <DeleteIcon color='error'/>
                            </IconButton>
                        </ListItemButton>
                    </ListItem>
                )
            }
        }
    }

    if(folders.length === 0 && files.length === 0) emptyText = 'This folder is empty.'

    return (
        <List>
            {emptyText}
            {folders}
            {files}
        </List>
    )
}

export default Storage;