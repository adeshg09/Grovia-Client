/*  Imports */
import { Platform } from 'react-native'

/* Relative Imports */
import Geolocation from 'react-native-geolocation-service'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { envConfig } from '../config/envConfig'
import { AppDispatch } from '../store/store'
import { deliveryLocationSliceActions } from '../store/customer/deliveryLocationSlice'

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Request location permission
 * @returns {Promise<boolean>}
 */
export const requestLocationPermission = async (): Promise<boolean> => {
	const permission =
		Platform.OS === 'android'
			? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
			: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

	const result = await check(permission)

	if (result !== RESULTS.GRANTED) {
		const reqResult = await request(permission)
		if (reqResult !== RESULTS.GRANTED) {
			console.log('App-level location permission denied')
			return false
		}
	}

	return true
}

/**
 * Get current location
 * @returns {Promise<Geolocation.GeoPosition>}
 */
export const getCurrentLocation = (): Promise<Geolocation.GeoPosition> => {
	return new Promise((resolve, reject) => {
		Geolocation.getCurrentPosition(
			position => resolve(position),
			error => reject(error),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
		)
	})
}

/**
 * Check if app-level location permission already granted (for screen mount).
 */
export const isLocationPermissionGranted = async (): Promise<boolean> => {
	const permission =
		Platform.OS === 'android'
			? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
			: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

	const result = await check(permission)
	return result === RESULTS.GRANTED
}

/**
 * Reverse geocode lat/lng to human-readable address using Google API
 */
export const getAddressFromCoords = async (
	latitude: number,
	longitude: number,
): Promise<string | null> => {
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${envConfig.GOOGLE_PLACES_API_KEY}`,
		)
		const data = await response.json()
		console.log('Address data', data)
		if (data.status === 'OK' && data.results.length > 0) {
			return data.results[0].formatted_address
		}
		console.warn('No address found for coordinates')
		return null
	} catch (error) {
		console.error('Geocoding API error:', error)
		return null
	}
}

/**
 * Set and save current location to redux store
 */
export const setAndSaveCurrentLocation = async (
	dispatch: AppDispatch,
	options?: {
		clearSelected?: boolean
		logPrefix?: string
	},
): Promise<boolean> => {
	try {
		const position = await getCurrentLocation()
		const { latitude, longitude } = position.coords
		const addressLine = await getAddressFromCoords(latitude, longitude)

		dispatch(
			deliveryLocationSliceActions.setCurrentLocation({
				addressLine: addressLine ?? '',
				lat: latitude,
				lng: longitude,
			}),
		)

		if (options?.clearSelected) {
			dispatch(deliveryLocationSliceActions.setSelectedLocation(null))
		}

		if (options?.logPrefix) {
			console.log(`📍 ${options.logPrefix} Address:`, addressLine)
		}

		return true
	} catch (err) {
		console.log('❌ Error while setting current location:', err)
		return false
	}
}
