import {fromJS} from 'immutable'
import {
    FETCH_TO_STATE_REQUEST,
    FETCH_TO_STATE_SUCCESS,
    FETCH_TO_STATE_FAIL
} from '../constants'


export default (state = fromJS({}), action) => {
    switch (action.type) {
        case FETCH_TO_STATE_REQUEST:
            return state.mergeIn([action.meta.key], fromJS({
                _request: action.payload.request,
                isFetching: true,
                isFetched: false,
                error: false
            }))

        case FETCH_TO_STATE_SUCCESS:
            return state.set(action.meta.key, fromJS({
                ...action.payload,
                isFetched: true,
                isFetching: false,
                error: false,
            }))

        case FETCH_TO_STATE_FAIL:
            return state.set(action.meta.key, {
                error: action.payload.error,
                isFetching: false,
                isFetched: false,
            })

        default:
            return state
    }
}