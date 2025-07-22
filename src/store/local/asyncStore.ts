/* Relative Imports */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CaptainOnboardingState } from '../captain/captainOnboardingSlice'

// --------------------------------------------------------------------------------------------------

/* Constants */
const localStoreKeys = {
	THEME_MODE: '@app_theme_mode',
	LOGGED_IN: '@loggedIn',
	IS_REGISTED: '@isRegisted',
	USER_DATA: '@user',
	USER_ACCESS_TOKEN: '@userAccessToken',
	USER_REFRESH_TOKEN: '@userRefreshToken',
	CAPTAIN_ONBOARDING: '@captainOnboardingState',
	CUSTOMER_DELIVERY_CURRENT_LOCATION: '@customerDeliveryCurrentLocation',
	CUSTOMER_DELIVERY_SAVED_ADDRESSES: '@customerDeliverySavedAddresses',
}

/* Functions */
const setItem = async (key: string, value: any) => {
	try {
		const data = JSON.stringify(value)
		await AsyncStorage.setItem(key, data)
	} catch (error) {
		console.log(`Error saving data for key ${key}:`, error)
	}
}

const fetchItem = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			return JSON.parse(value)
		}
		return null
	} catch (error) {
		console.log(`Error retrieving data for key ${key}:`, error)
		return null
	}
}

const removeItem = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key)
		return null
	} catch (error) {
		console.log(`Error removing data for key ${key}:`, error)
		return null
	}
}

/* Auth */
export const storeAuthData = async (data: {
	user: any
	accessToken: string
	refreshToken: string
}) => {
	await setItem(localStoreKeys.USER_DATA, data.user)
	await setItem(localStoreKeys.USER_ACCESS_TOKEN, data.accessToken)
	await setItem(localStoreKeys.USER_REFRESH_TOKEN, data.refreshToken)
}

export const loadAuthData = async () => {
	const accessToken = await fetchItem(localStoreKeys.USER_ACCESS_TOKEN)
	const refreshToken = await fetchItem(localStoreKeys.USER_REFRESH_TOKEN)
	const user = await fetchItem(localStoreKeys.USER_DATA)
	return { accessToken, refreshToken, user }
}

export const clearAuthData = async () => {
	await removeItem(localStoreKeys.USER_ACCESS_TOKEN)
	await removeItem(localStoreKeys.USER_REFRESH_TOKEN)
	await removeItem(localStoreKeys.USER_DATA)
	await removeItem(localStoreKeys.LOGGED_IN)
}

/* Captain Onboarding */
export const storeCaptainOnboarding = async (data: CaptainOnboardingState) => {
	await setItem(localStoreKeys.CAPTAIN_ONBOARDING, data)
}

export const loadCaptainOnboarding =
	async (): Promise<CaptainOnboardingState | null> => {
		return await fetchItem(localStoreKeys.CAPTAIN_ONBOARDING)
	}

export const clearCaptainOnboarding = async () => {
	await removeItem(localStoreKeys.CAPTAIN_ONBOARDING)
}

export { setItem, fetchItem, removeItem, localStoreKeys }
