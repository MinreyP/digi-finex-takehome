// generate a specific number of options and export it for further use
type Option = {
    id: string,
    name: string
}

export const genOptions = (number: number) => {
    const options = [];

    for (let i = 0; i < number; i++) {
        options.push({
            id: i.toString(),
            name: `Option ${i + 1}`
        })
    }

    return options;
}

// spread options evenly as possible
export const spreadOptions = (items: Option[], columnsNum: number) => {
    const itemsArr = items;
    const divideInt = columnsNum;
    let itemsGroup: Option[][] = [];

    for (let i = divideInt; i != 0; i--) {
        const renderNum = Math.ceil(itemsArr.length / i);
        itemsGroup = [...itemsGroup, itemsArr.splice(0, renderNum)];
    }

    return itemsGroup;
}

