const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
};
const HttpReducer = (currHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: false,
                error: null,
                data: null,
                extra: null,
                indentifier: action.indentifier
            };
        case 'RESPONSE':
            return {
                ...currHttpState,
                loading: false,
                data: action.responseData,
                extra: action.extra,
                indentifier: action.indentifier
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.errorMessage
            };
        case 'CLEAR':
            return initialState
        default:
            throw new Error('Should not reached!')
    }
}

export default HttpReducer;