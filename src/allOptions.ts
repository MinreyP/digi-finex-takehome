// generate a specific number of options and export it for further use

const genOptions = (number: number) => {
    const options = [];

    for (let i = 0; i < number; i++) {
        options.push({
            id: i.toString(),
            name: `Option ${i + 1}`
        })
    }

    return options;
}

export const allOptions = genOptions(10);
