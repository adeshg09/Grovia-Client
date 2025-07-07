/* Relative Imports */
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import captainOnboardingSlice from './captain/captainOnboardingSlice'

// -------------------------------------------------------------------------------------------------------------------------

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		captain: captainOnboardingSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
