import React, { useState } from 'react';

const IngredientForm = (props) => {

    const [ingName, setIngName] = useState('');
    const [ingAmount, setIngAmount] = useState('');

    const handleOnAddIngredient = () => {
        props.onHandleAdd({ name: ingName, amount, ingAmount })
    }

    function onEditClick(ingredient) {
        setIngName(ingredient.name)
        setIngAmount(ingredient.amount)
    }

    const onClear = () => {
        setIngName('')
        setIngAmount('')
    }

    return <React.Fragment>
        <form>
            <div className="form-group">
                <label htmlFor="name">Enter Ingredient Name :</label><br />
                <input
                    className="form-control"
                    type="text"
                    value={ingName}
                    onChange={event => setIngName(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Enter Amount :</label><br />
                <input
                    className="form-control"
                    type="text"
                    value={ingAmount}
                    onChange={event => setIngAmount(event.target.value)} />
            </div>
            <button
                type="button"
                className="btn btn-primary add-ingredient m-r-sm"
                onClick={handleOnAddIngredient}>Add Ingredient</button>
            {(ingName !== '' || ingAmount !== '') &&
                <button
                    type="button"
                    className="btn btn-secondary clear-btn"
                    onClick={onClear}>Clear</button>
            }
        </form>
    </React.Fragment>
}

export default IngredientForm;