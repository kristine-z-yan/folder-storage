import React from "react";
import Grid from "@mui/material/Grid";
import Form from "../../components/Form/Form";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Storage from "../storage/Storage";
import {Box} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const Folder:React.FC = () => {
    let { path } = useParams();
    const storage = useSelector((state:RootState) => state.state.storage);
    let content = storage;
    let folders = path?.split('-');
    const prevFolder = path?.substr(0, path?.lastIndexOf('-'));
    const backButton = prevFolder ? '/folders/'+ prevFolder : '/';
    if (folders?.length) {
        folders.map(name => {
            let item = content.find(el => el.name === name);
            if (item?.type === "folder") {
                content = item.children;
            }
            return content;
        })
    }

    return (
        <Grid container spacing={2} >
            <Grid item xs={2}>
                <Link to={backButton}>Back</Link>
            </Grid>
            <Grid item xs={6}>
                <Form content={content}/>
            </Grid>
            <Grid item xs={4}>
                <DeleteOutlineOutlinedIcon fontSize='large' sx={{ marginTop: '10px'}}/>
            </Grid>
            <Box sx={{
                width: 400,
                height: 500,
                border: '1px solid lightgrey',
                margin: 10
            }}>
                <Storage content={content}/>
            </Box>
        </Grid>
    )
}

export default Folder