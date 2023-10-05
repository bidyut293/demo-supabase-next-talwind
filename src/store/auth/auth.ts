import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

export interface AuthSlice {
  account: AccountType
  User: AccountType[]
}

export interface AccountType {
    id: number,
    first_name: string,
    last_name: string,
    company: string,
    email: string,
    phone: string,
    description: string
}


const initialState: AuthSlice = {
  account: {
    id: 0,
    first_name:'',
    last_name: '',
    company: '',
    email: '',
    phone: '',
    description: ''
  },
  User: []
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    craeteAccount: (state, action: PayloadAction<AuthSlice>) => {
      state.account.id = action.payload.account.id
      state.account.email = action.payload.account.email
      state.account.first_name = action.payload.account.first_name
      state.account.last_name = action.payload.account.last_name
      state.account.company = action.payload.account.company
      state.account.phone = action.payload.account.phone
      state.account.description = action.payload.account.description 
    },
    DeleteAccount: (state, action: PayloadAction<{id: number}>) => {
      state.User = state.User.filter(item => item.id === action.payload.id)
    },
    getAllUser: (state, action: PayloadAction<AccountType>)  => {
        state.User = [...state.User, action.payload]
    },
    editUserData: (state, action: PayloadAction<AccountType>) => {
        const findIndex = state.User.findIndex(i => i.id === action.payload.id)
        const updatedUsers = cloneDeep(state.User)
        updatedUsers.splice(findIndex, 1, action.payload)
        state.User = updatedUsers
    }
  }
})

export default slice.reducer
