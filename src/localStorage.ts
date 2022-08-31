export const loadState = () => {
    try {
        const serialState = localStorage.getItem('state');
        if (serialState === null) {
            return undefined;
        }
        return JSON.parse(serialState);
    } catch (e) {
        return undefined
    }
}

export const saveState = (state: { state: any }) => {
    try {
        const serialState = JSON.stringify(state);
        localStorage.setItem('state', serialState);
    } catch(e) {
        console.log(e);
    }
};