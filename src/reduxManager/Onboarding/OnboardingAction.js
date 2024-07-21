import { getStore } from '../store/store';
store = getStore();
export const ActionTypes = {
    SET_ONBOARD_DETAILS: 'SET_ONBOARD_DETAILS',
    RESET_ONBOARD_DETAILS: 'RESET_ONBOARD_DETAILS'
}

const setOnboardDetails = (onboardDetails) => {
    store.dispatch({ type: ActionTypes.SET_ONBOARD_DETAILS, payload: onboardDetails });
}

const resetOnboardDetails = () => {
    store.dispatch({ type: ActionTypes.RESET_ONBOARD_DETAILS });
}
export default {
    setOnboardDetails,
    resetOnboardDetails,
}