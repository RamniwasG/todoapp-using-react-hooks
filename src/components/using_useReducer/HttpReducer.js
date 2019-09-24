const HttpReducer = (currHttpState, action) => {
    switch(action.type) {
        case 'SEND':
            return { loading: false, error: null };
        case 'RESPONSE':
            return { ...currHttpState, loading: false };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        case 'CLEAR':
            return { error: null }
        default:
            throw new Error('Should not reached!')
    }
}

export default HttpReducer;