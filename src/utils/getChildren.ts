export const getChildren = (storage: any, route: string[]) => {
    let content = storage;
    route.map((name: string) => {
        let item = content.find((el:any) => el.name === name);
        if (item && item.type === "folder") {
            content = item.children;
        } else if(!item) {
            return false;
        }
        return content;
    })
    return content;
}