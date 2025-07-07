/* Relative Imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PersonalDetails = {
	firstName: string
	lastName: string
	email: string
	profileImage?: string
	dob?: Date
	gender?: string
}

type WorkPreferences = {
	vehicleType?: string
	workCity?: string
	outletId?: string
}

type KYCDetails = {
	aadhaar?: string
	pan?: string
	drivingLicense?: string
	selfieUrl?: string
	addressProof?: string
	address?: string
}

type BankDetails = {
	accountHolderName: string
	bankName: string
	accountNumber: string
	ifscCode: string
	upiId?: string
}

type FormData = {
	personalDetails: PersonalDetails
	workPreferences: WorkPreferences
	// kycDetails: KYCDetails
	bankDetails: BankDetails
}

type StepProgress = {
	[substep: string]: boolean
}

type Progress = {
	step1: StepProgress
	step2: StepProgress
	step3: StepProgress
	// step4: StepProgress
}

export type CaptainOnboardingState = {
	currentStep: number | null
	progress: Progress
	formData: FormData
}

// -------------------------------------------------------------------------------------------------------------------------

const initialState: CaptainOnboardingState = {
	currentStep: null,
	progress: {
		step1: { basicInfoDetails: false },
		step2: {
			vehicleType: false,
			workCity: false,
			outletId: false,
		},
		// step3: {
		// 	aadhaar: false,
		// 	pan: false,
		// 	drivingLicense: false,
		// 	selfieUrl: false,
		// },
		step3: { bankInfoDetails: false },
	},
	formData: {
		personalDetails: {
			firstName: '',
			lastName: '',
			email: '',
		},
		workPreferences: {},
		// kycDetails: {},
		bankDetails: {
			accountHolderName: '',
			bankName: '',
			accountNumber: '',
			ifscCode: '',
			upiId: '',
		},
	},
}

const captainOnboardingSlice = createSlice({
	name: 'Captain Onboarding Slice',
	initialState,
	reducers: {
		// Set form data for a specific section
		setFormData: (
			state,
			action: PayloadAction<{
				section: keyof FormData
				data: any
			}>,
		) => {
			state.formData[action.payload.section] = {
				...state.formData[action.payload.section],
				...action.payload.data,
			}
		},

		setSubStepCompleted: (
			state,
			action: PayloadAction<{
				step: keyof Progress
				substep: string
			}>,
		) => {
			if (!state.progress[action.payload.step]) {
				state.progress[action.payload.step] = {}
			}
			state.progress[action.payload.step][action.payload.substep] = true
		},

		setProgress: (state, action: PayloadAction<Progress>) => {
			state.progress = action.payload
		},

		setCurrentStep: (state, action: PayloadAction<number>) => {
			state.currentStep = action.payload
		},

		restoreOnboarding: (_, action: PayloadAction<CaptainOnboardingState>) => {
			return action.payload
		},

		resetOnboarding: () => initialState,
	},
})

export const captainOnboardingSliceActions = captainOnboardingSlice.actions
export default captainOnboardingSlice
