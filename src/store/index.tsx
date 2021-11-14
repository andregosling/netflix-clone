import { createStore } from 'redux';

const initialState = {
    isLogged: false,
    profile: undefined
}

function reducer(state = initialState, action: any) {
    if (action.type === 'finishLogin') {
        return {
            ...initialState,
            isLogged: true
        }
    } else if (action.type === 'selectProfile') {
        return {
            ...initialState,
            profile: action.profile
        }
    }

    return state;
}

const store = createStore(reducer)

export default store