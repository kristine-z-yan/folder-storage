export const getFile = (path: any, storage: any) => {
    let route = path.split('-');
    let content = storage;
    let filename = route.pop();
    if (route.length > 0) {
        route.map((name: string) => {
            let item = content.find((el:any) => el.name === name);
            if (item?.type === "folder") {
                content = item.children;
            }
            return content
        })
    }
    return content.find((item: { name: string; type: string; }) => item.name === filename && item.type === 'file')
}