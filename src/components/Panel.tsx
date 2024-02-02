import { genOptions, spreadOptions } from '../allOptions';
import './Panel.css';
import { useState, useRef } from 'react';
import InputGroup from './InputGroup';


const Panel = () => {
    // generate desired number of options
    const optionItems = genOptions(23);
    const numOfOptions = useRef(optionItems.length);

    // assign an initial columns for the UI
    const [columns, setColumns] = useState(3);
    const renderGroups = spreadOptions(optionItems, columns);

    // assign an initial selected item
    const [selectedItems, setSelectedItems] = useState<string[]>(['2', '4', '6']);

    const handleColumns = (action: string) => {
        // Avoid number of columns being bumped up to over X, or slammed down below Y for reasonable concern of layout
        if (action === 'inc' && numOfOptions.current / columns <= 3) {
            alert('Max Col Reached');
            return;
        }
        if (action === 'dec' && columns === 2) {
            alert('Min Col Reached');
            return;
        }
        if (action === 'inc') {
            setColumns(prev => prev + 1);
        }
        if (action === 'dec') {
            setColumns(prev => prev - 1);
        }
    }


    return (
        <>
            <InputGroup group={renderGroups} selected={selectedItems} setSelectedItems={setSelectedItems} />
            <div className="button-group">
                <div className="button-unit">
                    <span style={{ display: 'inline-block', marginRight: '2rem' }}>Number of Columns:</span>
                    <button className="number-click" type="button" onClick={() => handleColumns('dec')}>-</button>
                    <input type="text" className="number-display" value={columns} size={10} onChange={(e) => e.preventDefault()} />
                    <button className="number-click" type="button" onClick={() => handleColumns('inc')}>+</button>
                </div>
            </div>
            <div className="print-result">
                <h4>Print Selected Options:</h4>
                <ul className="selection-list">
                    {selectedItems.map(id => <li key={id}>Option {parseInt(id) + 1}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Panel;
