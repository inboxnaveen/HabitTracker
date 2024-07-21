const initialState = null;
const onboardReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'SET_ONBOARD_DETAILS':
            if (action.payload) {
                return action.payload
            }
            return state;
        case 'RESET_ONBOARD_DETAILS':
            return initialState
        default:
            return state;
    }
}

export default onboardReducer;
