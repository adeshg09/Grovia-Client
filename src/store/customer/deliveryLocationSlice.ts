/* Relative Imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface Address {
	id?: string
	label?: 'Home' | 'Work' | 'Other'
	addressLine: string
	lat: number
	lng: number
}

interface DeliveryState {
	currentLocation: Address | null
	selectedLocation: Address | null
	savedAddresses: Address[]
}

const initialState: DeliveryState = {
	currentLocation: null,
	selectedLocation: null,
	savedAddresses: [],
}

const deliveryLocationSlice = createSlice({
	name: 'Delivery Location Slice',
	initialState,
	reducers: {
		setCurrentLocation: (state, action: PayloadAction<Address>) => {
			state.currentLocation = action.payload
		},
		setSelectedLocation: (state, action: PayloadAction<Address | null>) => {
			state.selectedLocation = action.payload
		},
		setSavedAddresses: (state, action: PayloadAction<Address[]>) => {
			state.savedAddresses = action.payload
		},
	},
})

export const deliveryLocationSliceActions = deliveryLocationSlice.actions
export default deliveryLocationSlice
