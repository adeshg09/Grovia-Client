/* Relative Imports */
import axios, { AxiosInstance } from 'axios'

/* Local Imports */
import { envConfig } from './envConfig'
import { fetchItem, localStoreKeys } from '../store/local/asyncStore'

// -------------------------------------------------------------------------------------------------------------------------

export function axiosInstance(token: string): AxiosInstance {
	let baseUrl
	let headers

	baseUrl = envConfig.base.baseUrl
	console.log('baseUrl', baseUrl)

	if (token) {
		headers = {
			Authorization: `Bearer ${token}`,
		}
	}

	const axiosConfig = axios.create({
		baseURL: baseUrl,
		headers: headers,
	})

	axiosConfig.interceptors.request.use(
		async config => {
			// If no token was passed to axiosInstance, try to get it from storage
			if (!token) {
				try {
					const storedToken = await fetchItem(localStoreKeys.USER_ACCESS_TOKEN) // or your token key
					if (storedToken) {
						config.headers.Authorization = `Bearer ${storedToken}`
					}
				} catch (error) {
					console.log('Error getting token from storage:', error)
				}
			}
			return config
		},
		error => {
			return Promise.reject(error)
		},
	)

	axiosConfig.interceptors.response.use(
		response => {
			return response
		},
		error => {
			if (error.response) {
				if (error.response.status === 401) {
					console.log('response intercept error 401')
					// logout()
				}
			}
			return Promise.reject(error)
		},
	)

	return axiosConfig
}

export const baseUrl = axios.create({ baseURL: envConfig.base.baseUrl })
