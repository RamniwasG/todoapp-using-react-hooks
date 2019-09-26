import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { Alert } from 'reactstrap';
import IngredientList from '../IngredientList';
import IngredientReducer from './IngredientReducer';
import useHttp from '../../custom_hooks/customHttp';

const TodoUsingUseReducerHooks = () => {

    const [ingredients, dispatch] = useReducer(IngredientReducer, []);
    const [
        isLoading,
        error,
        data,
        extra,
        indentifier,
        sendRequest
    ] = useHttp()

    const [ingName, setIngName] = useState('')
    const [ingAmount, setIngAmount] = useState('')

    useEffect(() => {
        if (!isLoading && !error && indentifier === 'ADD_INGREDIENT') {
            dispatch({ type: 'ADD', ingredient: data })
        } else if (!isLoading && !error && indentifier === 'DELETE_INGREDIENT') {
            dispatch({ type: 'DELETE', id: extra })
        } else if (!isLoading && !error && indentifier === 'SET_INGREDIENT') {
            dispatch({ type: 'SET', ingredients: data })
        }
    }, [data, error, extra, indentifier])

    useEffect(() => {
        sendRequest(
            'https://todo-using-hooks.firebaseio.com/ingredients.json',
            'GET',
            null,
            null,
            'GET_INGREDIENTS'
        )
    }, [])

    function convertObjToArr(responseData) {
        var data = []
        for (const key in responseData) {
            data.push({
                id: key,
                name: responseData[key].name,
                amount: responseData[key].amount
            })
        }
        return data
    }

    const handleOnAddIngredient = () => {
        onAddIngredient({ name: ingName, amount: ingAmount })
    }

    const onAddIngredient = useCallback(ingredient => {
        sendRequest(
            'https://todo-using-hooks.firebaseio.com/ingredients.json',
            'POST',
            ingredient,
            null,
            'ADD_INGREDIENT'
        )
    }, [])

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
                <br /><br />
                {httpState.error && <Alert color="danger">Something went wrong!</Alert>}
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