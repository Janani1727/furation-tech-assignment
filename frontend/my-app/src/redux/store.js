import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { reducer as movie} from "./reducer"
import thunk from "redux-thunk"

const rootReducer=combineReducers({
    movie
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))


