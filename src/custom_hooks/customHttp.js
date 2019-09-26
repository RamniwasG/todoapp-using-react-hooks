const HttpReducer = (currHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: false, error: null };
        case 'RESPONSE':
            return { ...currHttpState, loading: false, data: action.responseData };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        case 'CLEAR':
            return { error: null }
        default:
            throw new Error('Should not reached!')
    }
}

const useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(
        HttpReducer, {
        loading: false,
        error: null
    }
    );

    const sendRequest = (url, method, data, extra, indentifier) => {
        dispatchHttp({ type: 'SEND' })
        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                return res.json()
            })
            .then(responseData => {
                dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: extra, indentifier: indentifier });
            })
            .catch((err) => {
                dispatchHttp({ type: 'ERROR', errorMessage: err.errorMessage });
            })
    }

    return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        extra: extra,
        indentifier: indentifier,
        sendRequest: sendRequest
    }

}

export default useHttp;