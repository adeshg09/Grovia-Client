import * as z from 'zod'

export const PersonalDetailsBasicInformationFormSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address'),
})

export type PersonalDetailsBasicInformationFormData = z.infer<
	typeof PersonalDetailsBasicInformationFormSchema
>

export const WorkPreferencesVehicleTypeFormSchema = z.object({
	vehicleType: z.string().min(1, 'Vehicle type is required'),
})

export type WorkPreferencesVehicleTypeFormData = z.infer<
	typeof WorkPreferencesVehicleTypeFormSchema
>

export const WorkPreferencesCityFormSchema = z.object({
	workCity: z.string().min(1, 'City is required'),
})

export type WorkPreferencesCityFormData = z.infer<
	typeof WorkPreferencesCityFormSchema
>

export const WorkPreferencesOutletFormSchema = z.object({
	outletId: z.string().min(1, 'Outlet is required'),
})

export type WorkPreferencesOutletFormData = z.infer<
	typeof WorkPreferencesOutletFormSchema
>

export const BankDetailsInformationFormSchema = z.object({
	accountHolderName: z
		.string()
		.min(2, 'Account holder name is required')
		.regex(/^[a-zA-Z ]+$/, 'Name should only contain letters and spaces'),

	accountNumber: z
		.string()
		.min(9, 'Account number must be at least 6 digits')
		.max(18, 'Account number can be max 18 digits')
		.regex(/^\d+$/, 'Account number must be digits only'),

	ifscCode: z
		.string()
		.regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code (e.g., SBIN0001234)')
		.min(11, 'IFSC Code must be 11 characters'),

	bankName: z.string().min(2, 'Bank name is required'),
})

export type BankDetailsInformationFormData = z.infer<
	typeof BankDetailsInformationFormSchema
>
