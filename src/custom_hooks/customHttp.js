import { useReducer, useCallback } from 'react';
import HttpReducer from '../components/using_useReducer/HttpReducer';

const useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(HttpReducer, {
        loading: false,
        error: null,
        data: null,
        extra: null,
        indentifier: null
    });

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

    const sendRequest = useCallback(
        (url, method, body, extra, reqIndentifier) => {
            dispatchHttp({ type: 'SEND', indentifier: reqIndentifier })
            fetch(url, {
                method: method,
                body: body,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    return res.json()
                })
                .then(responseData => {
                    dispatchHttp({
                        type: 'RESPONSE',
                        responseData: responseData,
                        extra: extra
                    });
                })
                .catch((err) => {
                    dispatchHttp({ type: 'ERROR', errorMessage: err.errorMessage });
                })
        }, []);

    return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        extra: httpState.extra,
        indentifier: httpState.indentifier,
        sendRequest: sendRequest,
        clear: clear
    }

}

export default useHttp;