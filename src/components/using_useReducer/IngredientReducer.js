const IngredientReducer = (currentState, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentState, action.ingredient];
        case 'DELETE':
            return currentState.filter(ing => ing.id !== action.id)
        default:
            throw new Error('Something went wrong!')
    }
}

export default IngredientReducer

