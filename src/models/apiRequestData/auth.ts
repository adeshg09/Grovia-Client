/* Auth */
export interface sendOtpApiRequest {
	phoneNumber: string
	countryCode: string
	channel?: 'sms' | 'email'
}

export interface verifyOtpApiRequest {
	otp?: string
	phoneNumber: string
	countryCode: string
	role: 'customer' | 'captain'
	isTruecaller?: boolean
}
