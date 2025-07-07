export interface createCaptainProfileApiRequest {
	firstName: string
	lastName: string
	email: string
}

export interface workPreferencesVehicleTypeSelectionApiRequest {
	vehicleType: string
}

export interface workPreferencesWorkCitySelectionApiRequest {
	workCity: string
}

export interface workPreferencesOutletSelectionApiRequest {
	outletId: string
}

export interface addBankDetailsApiRequest {
	bankDetails: {
		accountHolderName: string
		bankName: string
		accountNumber: string
		ifscCode: string
		upiId?: string
	}
}
