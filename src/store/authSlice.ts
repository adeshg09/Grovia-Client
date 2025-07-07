/* Relative Imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// -------------------------------------------------------------------------------------------------------------------------

const initialState = {
	loggedIn: false,
	isRegisted: false,
	token: {
		accessToken: '',
		refreshToken: '',
	},
	user: null,
}

const authSlice = createSlice({
	name: 'Auth Slice',
	initialState,
	reducers: {
		setLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.loggedIn = action.payload
		},
		setIsRegisted: (state, action: PayloadAction<boolean>) => {
			state.isRegisted = action.payload
		},
		setTokens: (
			state,
			action: PayloadAction<{
				accessToken: string
				refreshToken: string
			}>,
		) => {
			state.token.accessToken = action.payload.accessToken
			state.token.refreshToken = action.payload.refreshToken
		},
		setUser: (state, action: PayloadAction<any>) => {
			state.user = action.payload
		},
		logout: state => {
			state.loggedIn = false
			state.isRegisted = false
			state.token = {
				accessToken: '',
				refreshToken: '',
			}
		},
	},
})

export const authSliceActions = authSlice.actions
export default authSlice
