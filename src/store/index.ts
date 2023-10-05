import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RESET_STORE } from '@/store/redux.types'
import rootReducer from './root.reducer'

const store = configureStore({
  reducer: rootReducer,
  
})

export const resetStore = () => ({ type: RESET_STORE })
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
