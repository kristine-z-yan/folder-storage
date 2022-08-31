import { File } from "./File";

export interface Folder {
    path: string
    name: string,
    type: 'folder',
    children: Array<Folder | File>
}
