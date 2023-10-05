import store from '@/store'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { AuthSlice } from './auth'

export interface RootReduxState {
  authSlice: AuthSlice
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<T = Promise<void> | void> = ThunkAction<
  T,
  RootReduxState,
  unknown,
  Action<string>
>

export const RESET_STORE = 'RESET_STORE'
