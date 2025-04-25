const addUser = (action,payload) => {
    return {
        type: action,
        payload: payload
    }
}

const addPlanInfo = (action,payload) => {
    return {
        type: action,
        payload: payload,
    }
}

export { addUser, addPlanInfo}
// export { addCIMMenu, removeMenu, addCache, createItinearyList, changeSelected, swapTwoInList }