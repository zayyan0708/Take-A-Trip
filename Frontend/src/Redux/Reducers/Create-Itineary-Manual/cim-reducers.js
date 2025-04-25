
const initialState = {
    selected: {
        'breakfast': [],
        'lunch': [],
        'dinner': [],
        'shopping': [],
        'market': [],
        'amusement-park':[],
        'sightseeing':[],
    },
    cachez:{},
    itList: [],
    currentPostionPriorityTAT: 0,
};

const cimMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'modifyItList':
            return {
                ...state,
                itList: [...action.payload]
            }
        case 'modifySelected':
            return {
                ...state,
                selected: {...action.payload}
            }
        case 'createList':
            return {
                ...state,
                itList: [...action.payload]
            }
        case 'breakfast':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    'breakfast': [action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'lunch':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    'lunch': [action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'dinner':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    'dinner': [action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'shopping':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    shopping: [...state.selected.shopping,action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'market':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    market: [...state.selected.market,action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'amusement-park':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    amusementpark: [...state.selected["amusement-park"],action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'sightseeing':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    sightseeing: [...state.selected.sightseeing,action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT+1
            }
        case 'breakfastR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    'breakfast': [],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'lunchR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    'lunch': [],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'dinnerR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    'dinner': [],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'shoppingR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    shopping: [...action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'marketR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    market: [...action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'amusement-parkR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    amusementpark: [...action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'sightseeingR':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    sightseeing: [...action.payload],
                },
                currentPostionPriorityTAT: state.currentPostionPriorityTAT-1
            }
        case 'lunch-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'lunch': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        case 'breakfast-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'breakfast': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        case 'dinner-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'dinner': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        case 'shopping-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'shopping': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        case 'market-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'market': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        case 'sightseeing-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'sightseeing': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        case 'amusement-park-cache':
            return {
                ...state,
                cachez: {
                    ...state.cachez,
                    'amusement-park': {
                        'place': action.payload.hotels,
                        'phoneNumbers': action.payload.phoneNumbers,
                        'placeImgs': action.payload.placeImgs,
                    },
                }
            }
        default:
            return state
    }
};

export default cimMenuReducer;