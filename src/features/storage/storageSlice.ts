import { createSlice } from "@reduxjs/toolkit";
import {getChildren} from "../../utils/getChildren";
import {getFile} from "../../utils/getFile";

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
    data: string,
}

interface StorageSlice {
    storage: Array<Folder | File>,
    trash: Array<Folder | File>,
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
            data: '',
        },
        {
            name: 'file2',
            path: 'file2',
            type: 'file',
            data: '',
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
                    data: '',
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
                    data: '',
                    path: payload.path + '-' + payload.name
                })
            } else {
                state.storage = [
                    ...state.storage,
                    {
                        name: payload.name,
                        path: payload.name,
                        type: 'file',
                        data: ''
                    }

                ]
            }
        },
        saveFile(state, { payload }) {
            const file = getFile(payload.path, state.storage);
            file.data = payload.data;
        },
        moveToTrash(state, { payload }) {
            let route = payload.path.split('-');
            let content = state.storage;
            let itemName = route.pop();
            if (route.length > 0) {
                route.map((name: string) => {
                    let item = content.find((el:any) => el.name === name);
                    if (item?.type === "folder") {
                        content = item.children;
                    }
                    return content
                })
            }
            const fileIndex = content.findIndex((item: { name: string; type: string; }) => item.name === itemName && item.type === payload.type);
            const file = content.splice(fileIndex,1);
            state.trash = [
                ...state.trash,
                file[0]
            ]
        }
    }
})

export const storageReducer = storageSlice.reducer;
export const storageActions = storageSlice.actions;


export default storageSlice;

