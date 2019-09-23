import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import IngredientList from '../IngredientList';

const TodoUsingUseStateHooks = () => {
    
    const [ingName, setIngName] = useState('')
    const [ingAmount, setIngAmount] = useState('')
    const [ingredients, setIngredient] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect( () => {
        setIsLoading(true)
        fetch('https://todo-using-hooks.firebaseio.com/ingredients.json')
        .then(response => {
            setIsLoading(false)
            return response.json()
        })
        .then(responseData => {
            if(responseData) {
                var data = convertObjToArr(responseData)
                setIngredient(data)
            } 
        })
        .catch(err => {
            setError(true)
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
        fetch('https://todo-using-hooks.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify({ name: ingName, amount: ingAmount }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(responseData => {
            if(responseData) {
                setIngredient( prevIngredients => [...prevIngredients, { 
                        id: responseData.name,
                        name: ingName,
                        amount: ingAmount
                    }]
                )
                onClear()
            }
        })
        .catch(err => {
            setError(true)
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

    const onDeleteClick = (id) => {
        fetch(`https://todo-using-hooks.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(responseData => {
            setIngredient(prevIngredients => prevIngredients.filter(ing => ing.id !== id))
        })
        .catch(err => {
            setError(true)
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
                { error && <Alert color="danger">Something went wrong!</Alert> }
                <IngredientList 
                    ingredients={ingredients}
                    onEdit={onEditClick}
                    onDelete={onDeleteClick}
                    isLoading={isLoading}
                    isError={error} />
            </div>
        </React.Fragment>
    )
}

export default TodoUsingUseStateHooks;