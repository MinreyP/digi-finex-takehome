import { allOptions } from '../allOptions';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

const Form = () => {
    const optionItems = allOptions;
    // assign an initial selected item
    const [selectedItems, setSelectedItems] = useState<string[]>([optionItems[5].id]);

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
        if (selectedItems.length === optionItems.length) {
            setSelectedItems([]);
        } else {
            const allID = optionItems.map(option => option.id);
            setSelectedItems(allID);
        }
    }

    return (
        <>
            <form>
                {optionItems.map(option => {
                    return (
                        <div>
                            <input id={option.id} value={option.id} type="checkbox"
                                checked={selectedItems.includes(option.id)}
                                onChange={checkboxHandler} />
                            <label htmlFor={option.id}>{option.name}</label>
                        </div>
                    )
                })}
                <button onClick={selectAllHandler} type="button">
                    {selectedItems.length === optionItems.length ? 'Unselect All' : 'Select All'}
                </button>
            </form>
            <div>
                <h4>Print Selected Options:</h4>
                <ul>
                    {selectedItems.map(id => <li key={id}>Option {parseInt(id) + 1}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Form
