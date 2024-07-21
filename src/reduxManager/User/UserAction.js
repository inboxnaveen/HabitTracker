import { getStore } from '../store/store';
store = getStore();
export const ActionTypes = {
    SET_USER_DETAILS: 'SET_USER_DETAILS',
    RESET_USER_DETAILS: 'RESET_USER_DETAILS'
}

const setUserDetails = (userDetails) => {
    store.dispatch({ type: ActionTypes.SET_USER_DETAILS, payload: userDetails });
}

const resetUserDetails = () => {
    store.dispatch({ type: ActionTypes.RESET_USER_DETAILS });
}
export default {
    setUserDetails,
    resetUserDetails,
}