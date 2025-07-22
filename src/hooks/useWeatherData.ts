/* Imports */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAppSelector } from './storeHooks'
import { envConfig } from '../config/envConfig'

// -------------------------------------------------------------------------------------------------------------------------

export const useWeatherData = () => {
	/* Hooks */
	const currentLocation = useAppSelector(
		state => state.customerDeliveryLocation.currentLocation,
	)

	/* States */
	const [weatherData, setWeatherData] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	/* Functions */
	const fetchWeatherDataCity = async (): Promise<string | null> => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation?.lat},${currentLocation?.lng}&key=${envConfig.GOOGLE_PLACES_API_KEY}`,
			)
			const data = await response.json()
			if (data.status === 'OK' && data.results.length > 0) {
				const addressComponents = data.results[0].address_components
				const cityComponent = addressComponents.find((component: any) =>
					component.types.includes('locality'),
				)
				const city = cityComponent?.long_name || null
				return city
			}
			return null
		} catch (err: any) {
			console.error('Reverse geocoding error:', err)
			return null
		}
	}

	const fetchWeatherData = async () => {
		if (!currentLocation) return
		try {
			setLoading(true)
			const city = await fetchWeatherDataCity()
			if (!city) {
				throw new Error('City not found from location')
			}

			const res = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${envConfig.OPEN_WEATHER_MAP_API_KEY}&units=metric`,
			)

			setWeatherData(res.data)
			setError(null)
		} catch (err: any) {
			console.log('Weather API error:', err)
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (currentLocation) {
			fetchWeatherData()
		}
	}, [currentLocation])

	/* Output */
	return { weatherData, loading, error, refetch: fetchWeatherData }
}
