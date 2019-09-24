import React, { useState, useReducer, useEffect } from 'react';
import { Alert } from 'reactstrap';
import IngredientList from '../IngredientList';
import IngredientReducer from './IngredientReducer';
import HttpReducer from './HttpReducer';

const TodoUsingUseReducerHooks = () => {

    const [ingredients, dispatch] = useReducer(IngredientReducer, [])
    const [httpState, dispatchHttp] = useReducer(HttpReducer, { loading: false, error: null });

    const [ingName, setIngName] = useState('')
    const [ingAmount, setIngAmount] = useState('')
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState(false)

    useEffect( () => {
        // setIsLoading(true)
        dispatchHttp({ type: 'SEND'});
        fetch('https://todo-using-hooks.firebaseio.com/ingredients.json')
        .then(response => {
            // setIsLoading(false)
            dispatchHttp({ type: 'RESPONSE' });
            return response.json()
        })
        .then(responseData => {
            if(responseData) {
                var data = convertObjToArr(responseData)
                dispatch({
                    type: 'SET',
                    ingredients: data
                })
            } 
        })
        .catch((err) => {
            dispatchHttp({ type: 'ERROR', errorMessage: err.errorMessage });
        })
    }, [])

    function convertObjToArr (responseData) {
        var data = []
        for(const key in responseData) {
            data.push({
                id: key, 
                name: responseData[key].name ,
                amount: responseData[key].amount
            })
        }
        return data
    }

    const onAddIngredient = () => {
        dispatchHttp({ type: 'SEND' });
        fetch('https://todo-using-hooks.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify({ name: ingName, amount: ingAmount }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            dispatchHttp({ type: 'RESPONSE' });
            res.json()
        })
        .then(responseData => {
            if(responseData) {
                dispatch({
                    type: 'SET',
                    ingredient: { 
                        id: responseData.name,
                        name: ingName,
                        amount: ingAmount
                    }
                })
                onClear()
            }
        })
        .catch((err) => {
            dispatchHttp({ type: 'ERROR', errorMessage: err.errorMessage });
        })
    }

    const onEditClick = (ingredient) => {
        setIngName(ingredient.name)
        setIngAmount(ingredient.amount)
    }

    const onClear = () => {
        setIngName('')
        setIngAmount('')
    }

    const onDeleteClick = (ingridientId) => {
        dispatchHttp({ type: 'SEND' });
        fetch(`https://todo-using-hooks.firebaseio.com/ingredients/${ingridientId}.json`, {
            method: 'DELETE'
        })
        .then(res => {
            dispatchHttp({ type: 'RESPONSE' });
            return res.json()
        })
        .then(responseData => {
            dispatch({
                type: 'DELETE',
                id: ingridientId
            })
        })
        .catch((err) => {
            dispatchHttp({ type: 'ERROR', errorMessage: err.errorMessage });
        })
    }

    return (
        <React.Fragment>
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Enter Ingredient Name :</label><br/>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={ingName} 
                            onChange={event => setIngName(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Enter Amount :</label><br/>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={ingAmount} 
                            onChange={event => setIngAmount(event.target.value)} />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary add-ingredient m-r-sm"  
                        onClick={onAddIngredient}>Add Ingredient</button>
                    { (ingName !== '' || ingAmount !== '') && 
                        <button 
                            type="button" 
                            className="btn btn-secondary clear-btn"
                            onClick={onClear}>Clear</button>
                    }
                </form>
                <br/><br/>
                { httpState.error && <Alert color="danger">Something went wrong!</Alert> }
                <IngredientList 
                    ingredients={ingredients}
                    onEdit={onEditClick}
                    onDelete={onDeleteClick}
                    isLoading={httpState.loading} />
            </div>
        </React.Fragment>
    )
}

export default TodoUsingUseReducerHooks;