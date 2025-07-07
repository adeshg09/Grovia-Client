import { axiosInstance } from '../../config/axiosConfig'
import {
	sendOtpApiRequest,
	verifyOtpApiRequest,
} from '../../models/apiRequestData/auth'
import { SEND_OTP, VERIFY_OTP } from '../endpoints'

export const sendOtp = (reqData: sendOtpApiRequest): Promise<any> => {
	console.log('reqData', reqData)
	return axiosInstance('')
		.post(SEND_OTP, reqData)
		.then(response => response.data)
}

export const verifyOtp = (reqData: verifyOtpApiRequest): Promise<any> => {
	console.log('reqData', reqData)
	return axiosInstance('')
		.post(VERIFY_OTP, reqData)
		.then(response => response.data)
}
