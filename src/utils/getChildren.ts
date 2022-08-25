export const getChildren = (path: string, storage: any) => {
    let parents = path.split('-');
    let content = storage;
    parents.map((name: string) => {
        let item = content.find((el:any) => el.name === name);
        if (item?.type === "folder") {
            content = item.children;
        }
        return content;
    })
    return content;
}