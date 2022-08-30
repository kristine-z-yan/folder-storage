import { createSlice } from "@reduxjs/toolkit";
import { getChildren } from "../../utils/getChildren";
import { getFile } from "../../utils/getFile";

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
    errorMessage: string,
    successMessage: string,
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
    trash: [],
    errorMessage: '',
    successMessage: '',
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
            let itemName = route.pop();
            let content = getChildren(payload.path, state.storage);
            const fileIndex = content.findIndex((item: { name: string; type: string; }) => item.name === itemName && item.type === payload.type);
            const file = content.splice(fileIndex,1);
            state.trash = [
                ...state.trash,
                file[0]
            ]
        },
        deleteItem(state, { payload }) {
            state.trash.splice(payload.index, 1);
        },
        recoverItem(state, { payload }) {
            let route = payload.path.split('-');
            let itemName = route.splice(route.length, 1);
            const fileIndex = state.trash.findIndex((item: { name: string; type: string; }) => item.name === itemName && item.type === payload.type);
            const file = state.trash.splice(fileIndex, 1)[0];
            let content = getChildren(payload.path, state.storage);
            const index = content.findIndex((item: { path: string; type: string; }) => item.path === file.path && item.type === file.type);
            if (index !== -1) {
                state.trash = [
                    ...state.trash,
                    file
                ]
                state.errorMessage = 'There is an item with such name'
            } else {
                content.push(file)
                state.successMessage = 'Item recovered successfully'
            }
        },
        clearMessages(state) {
            state.errorMessage = '';
            state.successMessage = '';
        }
    }
})

export const storageReducer = storageSlice.reducer;
export const storageActions = storageSlice.actions;


export default storageSlice;

