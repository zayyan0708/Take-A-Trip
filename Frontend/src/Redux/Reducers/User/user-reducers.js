
const initialState = {
    userInfo: {},
    planInfo: {},
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'insertUser':
            return {
                ...state,
                userInfo: {...action.payload}
            }
        case 'insertPlanTrip':
            return {
                ...state,
                planInfo: {...action.payload}
            }
        default:
            return state
    }
};

export default userReducer;