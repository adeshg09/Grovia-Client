import { useMutation } from '@tanstack/react-query'
import {
	sendOtpApiRequest,
	verifyOtpApiRequest,
} from '../../models/apiRequestData/auth'
import { sendOtp, verifyOtp } from '../../services/auth/auth'

export const useSendOtp = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	console.log('check')
	return useMutation({
		mutationFn: (reqData: sendOtpApiRequest) => sendOtp(reqData),
		onSuccess,
		onError,
	})
}

export const useVerifyOtp = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: verifyOtpApiRequest) => verifyOtp(reqData),
		onSuccess,
		onError,
	})
}
