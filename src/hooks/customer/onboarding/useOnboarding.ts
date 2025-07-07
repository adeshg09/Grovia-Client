import { useMutation, useQuery } from '@tanstack/react-query'
import { createCustomerProfileApiRequest } from '../../../models/apiRequestData/customer/onboarding'
import { createCustomerProfile } from '../../../services/customer/onboarding'

export const useCustomerCreateProfile = (
	onSuccess?: (data: any) => void,
	onError?: (err: any) => void,
) => {
	return useMutation({
		mutationFn: (reqData: createCustomerProfileApiRequest) =>
			createCustomerProfile(reqData),
		onSuccess,
		onError,
	})
}
