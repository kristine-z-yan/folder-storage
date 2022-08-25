export type Folder = {
    path: string,
    name: string,
    type: 'folder',
    children: Array<Folder | File> | []
}
