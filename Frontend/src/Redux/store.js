import {createStore} from 'redux'
import rootReducer from './Reducers';



const store = createStore(rootReducer);


export {store};