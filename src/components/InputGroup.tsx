import { ChangeEvent, ChangeEventHandler } from 'react';

type Option = {
    id: string,
    name: string
}

type InputGroupProps = {
    group: Option[][],
    selected: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
}

const InputGroup = ({ group, selected, setSelectedItems }: InputGroupProps) => {

    const optionItems = group.flat();

    const checkboxHandler: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        const isSelected = e.target.checked;
        const targetID = e.target.value;

        if (isSelected) {
            // if the input is checked, then record its ID in the selectedItems
            setSelectedItems(prevSelected => [...prevSelected, targetID]);
        } else {
            // if the input is unchecked, remove its ID from the selectedItems
            setSelectedItems(prevSelected => {
                return prevSelected.filter(id => id !== targetID);
            })
        }
    }

    const selectAllHandler = () => {
        // it's a toggle feature:
        // check if all the option items are selected, if they are, then unselect all of them
        // otherwise select all of them
        if (selected.length === optionItems.length) {
            setSelectedItems([]);
        } else {
            const allID = optionItems.map((option: Option) => option.id);
            setSelectedItems(allID);
        }
    }

    return (
        <>
            <div className="button-group">
                <div className="button-unit">
                    <button onClick={selectAllHandler} type="button">
                        {selected.length === optionItems.length ? 'Unselect All' : 'Select All'}
                    </button>
                </div>
            </div>
            <div className="input-wrapper">
                {group.map((arr) => (
                    <div className="option-column">
                        {arr.map(item => (
                            <div key={item.id} className="form-control">
                                <input
                                    id={item.id}
                                    value={item.id}
                                    type="checkbox"
                                    checked={selected.includes(item.id)}
                                    onChange={checkboxHandler}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default InputGroup