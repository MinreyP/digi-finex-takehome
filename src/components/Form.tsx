import { allOptions } from '../allOptions';
import './form.css';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

const Form = () => {
    const optionItems = allOptions;
    // assign an initial selected item
    const [selectedItems, setSelectedItems] = useState<string[]>([optionItems[5].id]);
    // assign an initial columns for the UI
    const [columns, setColumns] = useState(3);

    // generate grid layout styling
    const gridStyle = {
        gridAutoFlow: 'column',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: 'repeat(4, minmax(32px, auto))',
    };

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

    const updateColumns = (action: string) => {
        // Avoid number of columns being bumped to over 6, or down below 2 for reasonable layout
        if (action === 'inc' && columns < 6) {
            setColumns(prev => prev + 1);
            return;
        }
        if (action === 'dec' && columns > 2) {
            setColumns(prev => prev - 1);
            return;
        } else {
            alert(`Layout Limit Reached!`);
        }
    }

    return (
        <>
            <form className="input-wrapper" style={gridStyle}>
                {optionItems.map(option => {
                    return (
                        <div className="form-control">
                            <input id={option.id} value={option.id} type="checkbox"
                                checked={selectedItems.includes(option.id)}
                                onChange={checkboxHandler} />
                            <label htmlFor={option.id}>{option.name}</label>
                        </div>
                    )
                })}
            </form>
            <div className="button-group">
                <div className="button-unit">
                    <button onClick={selectAllHandler} type="button">
                        {selectedItems.length === optionItems.length ? 'Unselect All' : 'Select All'}
                    </button>
                </div>
                <div className="button-unit">
                    <span style={{ display: 'inline-block', marginLeft: '1rem' }}>Number of Columns:</span>
                    <button className="number-click" type="button" onClick={() => updateColumns('dec')}>-</button>
                    <input type="text" size={10} value={columns} />
                    <button className="number-click" type="button" onClick={() => updateColumns('inc')}>+</button>
                </div>
            </div>
            <div>
                <h4>Print Selected Options:</h4>
                <ul className="selection-list">
                    {selectedItems.map(id => <li key={id}>Option {parseInt(id) + 1}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Form
