import { createSlice } from "@reduxjs/toolkit";
import { getChildren } from "../../utils/getChildren";
import { getFile } from "../../utils/getFile";

import { Folder } from "../../modules/Folder";
import { File } from "../../modules/File";

interface StorageSlice {
    storage: Array<Folder | File>,
    trash: Array<Folder | File>,
    errorMessage: string,
    successMessage: string,
}

const initialState: StorageSlice = {
    storage: [],
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
                let route = payload.path.split('-');
                const content = getChildren(state.storage, route);
                content.push({
                    name: payload.name,
                    type: 'folder',
                    children: [],
                    path: payload.path + '-' + payload.name,
                })
            } else {
                state.storage = [
                    ...state.storage,
                    {
                        name: payload.name,
                        type: 'folder',
                        children: [],
                        path: payload.name,
                    }
                ]
            }
        },
        addFile(state, { payload }) {
            if (payload.path) {
                let route = payload.path.split('-');
                const content = getChildren(state.storage, route);
                content.push({
                    name: payload.name,
                    type: 'file',
                    data: '',
                    path: payload.path + '-' + payload.name,
                })
            } else {
                state.storage = [
                    ...state.storage,
                    {
                        name: payload.name,
                        path: payload.name,
                        type: 'file',
                        data: '',
                    }

                ]
            }
        },
        saveFile(state, { payload }) {
            const file = getFile(payload.path, state.storage);
            file.data = payload.data;
            state.successMessage = 'File saved successfully';
        },
        moveToTrash(state, { payload }) {
            let route = payload.path.split('-');
            let itemName = route.pop();
            let content = route.length > 0 ? getChildren(state.storage, route): state.storage;
            const fileIndex = content.findIndex((item: { name: string; type: string; }) => item.name === itemName && item.type === payload.type);
            const file = content.splice(fileIndex, 1)[0];
            state.trash = [
                ...state.trash,
                file
            ]
        },
        deleteItem(state, { payload }) {
            state.trash.splice(payload.index, 1);
        },
        recoverItem(state, { payload }) {
            // Find item in trash
            let route = payload.path.split('-');
            let itemName = route.pop();
            const itemIndex = state.trash.findIndex((trashItem: { name: string; type: string; }) => trashItem.name === itemName && trashItem.type === payload.type);
            const item = state.trash[itemIndex];

            // Find item's parents in storage
            let content = route.length > 0 ? getChildren(state.storage, route): state.storage;
            if (!content) {
                state.errorMessage = 'This item can not be recovered'
            } else {
                const index = content.findIndex((el: { path: string; type: string; }) => el.path === item.path && el.type === item.type);

                if (index !== -1) {
                    state.errorMessage = 'There is an item with such name'
                } else {
                    content.push(state.trash.splice(itemIndex, 1)[0])
                    state.successMessage = 'Item recovered successfully'
                }
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

