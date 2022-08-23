import * as React from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router, Link,
} from "react-router-dom";

import { RootState } from '../../app/store'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

const Storage: React.FC = () => {
    const storage = useSelector((state:RootState) => state.state.storage);

    let folders: JSX.Element[] = [];
    let files: JSX.Element[] = [];

    if (storage.length > 0 ) {
        for (const e of storage) {
            if (e.type === 'folder') {
                folders.push(
                <ListItem disablePadding key={`folder-${e.name}`} component={Link} to="/folder">
                    <ListItemButton>
                        <ListItemIcon>
                            <FolderIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText primary={e.name} sx={{ display: 'inline-block' }}/>
                        <IconButton>
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
                            <ListItemText primary={e.name} />
                            <IconButton>
                                <DeleteIcon color='error'/>
                            </IconButton>
                        </ListItemButton>
                    </ListItem>
                )
            }
        }
    }

    return (
        <Router>
            <List>
                {folders}
                {files}
            </List>
        </Router>
    )
}

export default Storage;