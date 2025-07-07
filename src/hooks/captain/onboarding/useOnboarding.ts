import { useMutation, useQuery } from '@tanstack/react-query'
import {
	addBankDetailsApiRequest,
	createCaptainProfileApiRequest,
	workPreferencesOutletSelectionApiRequest,
	workPreferencesVehicleTypeSelectionApiRequest,
	workPreferencesWorkCitySelectionApiRequest,
} from '../../../models/apiRequestData/captain/onboarding'
import {
	addBankDetails,
	createCaptainProfile,
	getAllOutlets,
	selectOutlet,
	selectVehicleType,
	selectWorkCity,
	submitOnboarding,
} from '../../../services/captain/onboarding'

export const useCaptainPersonalDetails = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: createCaptainProfileApiRequest) =>
			createCaptainProfile(reqData),
		onSuccess,
		onError,
	})
}

export const useCaptainWorkPreferencesVehicleTypeSelection = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: workPreferencesVehicleTypeSelectionApiRequest) =>
			selectVehicleType(reqData),
		onSuccess,
		onError,
	})
}

export const useCaptainWorkPreferencesCitySelection = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: workPreferencesWorkCitySelectionApiRequest) =>
			selectWorkCity(reqData),
		onSuccess,
		onError,
	})
}
export const useCaptainWorkPreferencesOutletList = (
	workCity: string | undefined,
) => {
	return useQuery({
		queryKey: ['outletsByCity', workCity],
		queryFn: () => getAllOutlets(workCity),
		enabled: !!workCity,
		select: res => res?.data?.outlets ?? [],
	})
}

export const useCaptainWorkPreferencesOutletSelection = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: workPreferencesOutletSelectionApiRequest) =>
			selectOutlet(reqData),
		onSuccess,
		onError,
	})
}

export const useCaptainBankDetails = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: addBankDetailsApiRequest) => addBankDetails(reqData),
		onSuccess,
		onError,
	})
}

export const useCaptainSubmitOnboarding = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: () => submitOnboarding(),
		onSuccess,
		onError,
	})
}
