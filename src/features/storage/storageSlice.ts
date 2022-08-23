import { createSlice } from "@reduxjs/toolkit";

type Folder = {
    name: string,
    type: 'folder',
    children: Array<Folder | File>
}

type File = {
    name: string,
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
            name: 'Folder 1',
            type: 'folder',
            children: [],
        },
        {
            name: 'file 1',
            type: 'file',
            text: '',
        },
        {
            name: 'file 2',
            type: 'file',
            text: '',
        },
        {
            name: 'Folder 2',
            type: 'folder',
            children: [
                {
                    name: 'Folder 2.1',
                    type: 'folder',
                    children: [],
                },
                {
                    name: 'file 2.1',
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
            state.storage = [
                ...state.storage,
                {
                    name: payload,
                    type: 'folder',
                    children: [],
                }

            ]
        },
        addFile(state, { payload }) {
            state.storage = [
                ...state.storage,
                {
                    name: payload,
                    type: 'file',
                    text: ''
                }

            ]
        },
        saveFile(state, action) {},
    }
})

export const storageReducer = storageSlice.reducer;
export const storageActions = storageSlice.actions;


export default storageSlice;

