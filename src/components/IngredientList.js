import React, { useState } from 'react';
import Loader from '../common/Loader';

const IngredientList = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(-1)

    const handleEdit = (id, index) => {
        setSelectedIndex(index)
        props.onEdit(id)
    }

    const handleDelete = (id) => {
        props.onDelete(id)
    }

    return <React.Fragment>
        <h4 className="text-center">Ingredients List</h4>
        <ul className="list-group">
            { props.isLoading && <Loader /> }
            { !props.isLoading && props.ingredients.length === 0 &&
                <li className="list-group-item text-center">{props.isError ? 'Error!' : 'No Ingredient Added Yet!'}</li>
            }
            { !props.isLoading && props.ingredients.length > 0 && props.ingredients.map( (ingredient, index) => {
                return (
                    <li 
                        key={ingredient.id} 
                        className="list-group-item" 
                        style = {{
                            display:'inline-flex', 
                            backgroundColor: selectedIndex === index ? 'lightgrey' : 'white'
                        }}>
                        <div className="col-sm-5 text-left">{ingredient.name}</div>
                        <div className="col-sm-3"><b>{ingredient.amount}$</b></div>
                        <div className="col-sm-4" style={{display: 'inline-flex'}}>
                            <button
                                type="button"
                                className="btn btn-success btn-sm m-r-sm"
                                onClick={() => handleEdit(ingredient, index)}>Edit</button>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-sm" 
                                onClick={() => handleDelete(ingredient.id)}>Delete</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </React.Fragment>
}

export default IngredientList;