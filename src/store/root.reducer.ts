import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { RESET_STORE } from '@/store/redux.types'
import authSlice from '@/store/auth'

const appReducer = combineReducers({
  authSlice,
})

const persistConfig = {
  key: 'root',
  storage
}

// const persistedReducer = persistReducer(persistConfig, appReducer)

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
