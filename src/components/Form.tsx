import { allOptions } from '../allOptions';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

const Form = () => {
    const optionItems = allOptions;
    const [selectedItems, setSelectedItems] = useState<string[]>([optionItems[5].id]);

    const checkboxHandler: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        const isSelected = e.target.checked;
        const targetID = e.target.value;

        if (isSelected) {
            setSelectedItems(prevSelected => [...prevSelected, targetID]);
        } else {
            setSelectedItems(prevSelected => {
                return prevSelected.filter(id => id !== targetID);
            })
        }
    }

    const selectAllHandler = () => {
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
