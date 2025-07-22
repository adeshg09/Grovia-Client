/* Relative Imports */
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import captainOnboardingSlice from './captain/captainOnboardingSlice'
import deliveryLocationSlice from './customer/deliveryLocationSlice'

// -------------------------------------------------------------------------------------------------------------------------

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		captain: captainOnboardingSlice.reducer,
		customerDeliveryLocation: deliveryLocationSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
