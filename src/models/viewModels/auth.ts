import * as z from 'zod'

export const EnterNumberFormSchema = z.object({
	phoneNumber: z.string().min(10, 'Phone number is required'),
	countryCode: z.string().startsWith('+', 'Invalid country code'),
})

export type EnterNumberFormData = z.infer<typeof EnterNumberFormSchema>

export const EnterOtpFormSchema = z.object({
	otp: z.array(z.string().length(1)).length(6, 'Enter a valid OTP'),
})

export type EnterOtpFormData = z.infer<typeof EnterOtpFormSchema>
