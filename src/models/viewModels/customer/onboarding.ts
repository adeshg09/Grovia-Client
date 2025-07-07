import * as z from 'zod'

export const CreateCustomerProfileFormSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address'),
})

export type CreateCustomerProfileFormData = z.infer<
	typeof CreateCustomerProfileFormSchema
>
