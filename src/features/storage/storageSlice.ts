import { createSlice } from "@reduxjs/toolkit";
import {getChildren} from "../../utils/getChildren";

type Folder = {
    path: string,
    name: string,
    type: 'folder',
    children: Array<Folder | File> | []
}

type File = {
    name: string,
    path: string,
    type: 'file',
    text: string,
}

interface StorageSlice {
    storage: Array<Folder | File>,
    trash: []
}

const initialState: StorageSlice = {
    storage: [
        {
            path: 'Folder1',
            name: 'Folder1',
            type: 'folder',
            children: [],
        },
        {
            name: 'file1',
            path: 'file1',
            type: 'file',
            text: '',
        },
        {
            name: 'file2',
            path: 'file2',
            type: 'file',
            text: '',
        },
        {
            path: 'Folder2',
            name: 'Folder2',
            type: 'folder',
            children: [
                {
                    path: 'Folder2-Folder2.1',
                    name: 'Folder2.1',
                    type: 'folder',
                    children: [
                        {
                            path: 'Folder2-Folder2.1-Folder2.1.1',
                            name: 'Folder2.1.1',
                            type: 'folder',
                            children: [],
                        },
                    ],
                },
                {
                    name: 'file2.1',
                    path: 'Folder2-file2.1',
                    type: 'file',
                    text: '',
                },
            ],
        },
    ],
    trash: []
};

const storageSlice = createSlice({
    name: 'storage',
    initialState: initialState,
    reducers: {
        addFolder(state, { payload }) {
            if (payload.path) {
                const content = getChildren(payload.path, state.storage);
                content.push({
                    name: payload.name,
                    type: 'folder',
                    children: [],
                    path: payload.path + '-' + payload.name
                })
            } else {
                state.storage = [
                    ...state.storage,
                    {
                        name: payload.name,
                        type: 'folder',
                        children: [],
                        path: payload.name
                    }
                ]
            }
        },
        addFile(state, { payload }) {
            if (payload.path) {
                const content = getChildren(payload.path, state.storage);
                content.push({
                    name: payload.name,
                    type: 'file',
                    text: '',
                    path: payload.path + '-' + payload.name
                })
            } else {
                state.storage = [
                    ...state.storage,
                    {
                        name: payload.name,
                        path: payload.name,
                        type: 'file',
                        text: ''
                    }

                ]
            }
        },
        saveFile(state, action) {},
    }
})

export const storageReducer = storageSlice.reducer;
export const storageActions = storageSlice.actions;


export default storageSlice;

