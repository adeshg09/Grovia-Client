import { createCustomerProfileApiRequest } from '../../models/apiRequestData/customer/onboarding'
import { axiosInstance } from '../../config/axiosConfig'
import { CREATE_CAPTAIN_PROFILE, CREATE_CUSTOMER_PROFILE } from '../endpoints'

export const createCustomerProfile = (
	reqData: createCustomerProfileApiRequest,
): Promise<any> => {
	return axiosInstance('')
		.post(CREATE_CUSTOMER_PROFILE, reqData)
		.then(response => response.data)
}
