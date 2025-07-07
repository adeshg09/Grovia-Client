export type AuthStackParamList = {
	Onboarding: undefined
	AuthWelcome: undefined
	EnterNumber: {
		role: string
	}
	EnterOtp: {
		countryCode: string
		phoneNumber: string
		role: string
	}
}
