const addCIMMenu = (action,payload) => {
    return {
        type: action,
        payload: payload
    }
}
const removeMenu = (action,payload) => {
    return {
        type: action,
        payload: payload
    }
}

const addCache = (action,payload) => {
    return {
        type: action,
        payload: {
            'hotels': payload.hotels,
            'phoneNumbers': payload.phoneNumbers,
            'placeImgs': payload.placeImgs,
        },
    }
}

const createItinearyList = (action,payload) => {
    return{
        type: action,
        payload: payload,
    }
}

const changeSelected = (action,payload) => {
    return {
        type: action,
        payload: payload,
    }
}

const swapTwoInList = (action,payload) => {
    return {
        type: action,
        payload: payload
    }
}


export { addCIMMenu, removeMenu, addCache, createItinearyList, changeSelected, swapTwoInList }