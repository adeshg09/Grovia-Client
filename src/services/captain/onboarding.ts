import { createCaptainProfileApiRequest } from '../../models/apiRequestData/captain/onboarding'
import { axiosInstance } from '../../config/axiosConfig'
import {
	ADD_BANK_DETAILS,
	CREATE_CAPTAIN_PROFILE,
	GET_ALL_OUTLETS,
	SELECT_OUTLET,
	SELECT_VEHICLE_TYPE,
	SELECT_WORK_CITY,
	SUBMIT_ONBOARDING,
} from '../endpoints'

/* Personal Details */
export const createCaptainProfile = (
	reqData: createCaptainProfileApiRequest,
): Promise<any> => {
	return axiosInstance('')
		.post(CREATE_CAPTAIN_PROFILE, reqData)
		.then(response => response.data)
}

/* Work Preferences */
export const selectVehicleType = (reqData: any): Promise<any> => {
	return axiosInstance('')
		.post(SELECT_VEHICLE_TYPE, reqData)
		.then(response => response.data)
}

export const selectWorkCity = (reqData: any): Promise<any> => {
	return axiosInstance('')
		.post(SELECT_WORK_CITY, reqData)
		.then(response => response.data)
}

export const selectOutlet = (reqData: any): Promise<any> => {
	return axiosInstance('')
		.post(SELECT_OUTLET, reqData)
		.then(response => response.data)
}

export const getAllOutlets = (workCity?: string): Promise<any> => {
	console.log('Fetching outlets for city:', workCity)
	return axiosInstance('')
		.get(GET_ALL_OUTLETS, {
			params: { city: workCity },
		})
		.then(response => response.data)
}

/* Bank Details */
export const addBankDetails = (reqData: any): Promise<any> => {
	console.log('reqData', reqData)
	return axiosInstance('')
		.post(ADD_BANK_DETAILS, reqData)
		.then(response => response.data)
}

/* Submit Onboarding */
export const submitOnboarding = (): Promise<any> => {
	return axiosInstance('')
		.patch(SUBMIT_ONBOARDING)
		.then(response => response.data)
}
