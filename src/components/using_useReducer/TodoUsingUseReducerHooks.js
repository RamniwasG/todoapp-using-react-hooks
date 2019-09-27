import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { Alert } from 'reactstrap';
import IngredientList from '../IngredientList';
import IngredientReducer from './IngredientReducer';
import useHttp from '../../custom_hooks/customHttp';

const TodoUsingUseReducerHooks = () => {

    const [ingName, setIngName] = useState('');
    const [ingAmount, setIngAmount] = useState('');

    const [userIngredients, dispatch] = useReducer(IngredientReducer, []);

    const [
        isLoading,
        error,
        data,
        extra,
        indentifier,
        sendRequest,
        clear
    ] = useHttp()

    useEffect(() => {
        dispatch({ type: 'SET', ingredients: userIngredients })
    }, [userIngredients])

    useEffect(() => {
        if (!isLoading && !error && indentifier === 'ADD_INGREDIENT') {
            dispatch({
                type: 'ADD',
                ingredient: {
                    id: data.name,
                    ...extra
                }
            })
        } else if (!isLoading && !error && indentifier === 'DELETE_INGREDIENT') {
            dispatch({
                type: 'DELETE',
                id: extra
            })
        } else if (!isLoading && !error && indentifier === 'SET_INGREDIENT') {
            dispatch({
                type: 'SET',
                ingredients: data
            })
        }
    }, [data, error, isLoading, extra, indentifier]);

    const submitHandler = () => {
        handleOnAddIngredient({ name: ingName, amount: ingAmount })
    }

    const handleOnAddIngredient = useCallback(
        ingredient => {
            sendRequest(
                'https://todo-using-hooks.firebaseio.com/ingredients.json',
                'POST',
                JSON.stringify(ingredient),
                ingredient,
                'ADD_INGREDIENT'
            )
        }, [sendRequest])

    const onDeleteClick = useCallback(
        IngredientId => {
            sendRequest(
                `https://todo-using-hooks.firebaseio.com/ingredients/${IngredientId}.json`,
                'DELETE',
                null,
                IngredientId,
                'DELETE_INGREDIENT'
            )
        }, [sendRequest]);

    const onClear = () => {
        setIngName('')
        setIngAmount('')
        clear()
    }

    function onEditClick(ingredient) {
        setIngName(ingredient.name)
        setIngAmount(ingredient.amount)
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
                        onClick={submitHandler}>Add Ingredient</button>
                    {(ingName !== '' || ingAmount !== '') &&
                        <button
                            type="button"
                            className="btn btn-secondary clear-btn"
                            onClick={onClear}>Clear</button>
                    }
                </form>
                {error && <Alert color="danger">Something went wrong!</Alert>}
                <IngredientList
                    ingredients={userIngredients}
                    onEdit={onEditClick}
                    onDelete={onDeleteClick}
                    isLoading={isLoading}
                    error={error} />
            </div>
        </React.Fragment>
    )
}

export default TodoUsingUseReducerHooks;