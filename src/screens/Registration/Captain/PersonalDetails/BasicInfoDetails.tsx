/* Imports */
import React, { forwardRef, useImperativeHandle } from 'react'
import { View } from 'react-native'

/* Relative Imports */
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

/* Local Imports */
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import { useTheme } from '../../../../hooks/useTheme'
import { refHeightCalc } from '../../../../static/dimensions'
import {
	PersonalDetailsBasicInformationFormSchema,
	PersonalDetailsBasicInformationFormData,
} from '../../../../models/viewModels/captain/onboarding'
import InputField from '../../../../components/InputField/InputField'
import { useCaptainPersonalDetails } from '../../../../hooks/captain/onboarding/useOnboarding'
import { captainOnboardingSliceActions } from '../../../../store/captain/captainOnboardingSlice'
import { storeCaptainOnboarding } from '../../../../store/local/asyncStore'
import { RootState } from '../../../../store/store'
import { styles } from './index.styles'

// -------------------------------------------------------------------------------------------------------------------------

type PropsCaptainPersonalBasicInfoDetails = {
	navigation: any
	setIsLoading: (value: boolean) => void
}

export type CaptainPersonalBasicInfoRef = {
	submit: () => void
}

const CaptainPersonalBasicInfoDetails = forwardRef<
	CaptainPersonalBasicInfoRef,
	PropsCaptainPersonalBasicInfoDetails
>(({ navigation, setIsLoading }, ref) => {
	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<PersonalDetailsBasicInformationFormData>({
		resolver: zodResolver(PersonalDetailsBasicInformationFormSchema),
		defaultValues: {
			firstName: onboardingState.formData.personalDetails.firstName,
			lastName: onboardingState.formData.personalDetails.lastName,
			email: onboardingState.formData.personalDetails.email,
		},
		mode: 'onChange',
	})

	const { mutate: captainPersonalDetails, isPending } =
		useCaptainPersonalDetails()

	/* Constants */
	const profileFields = [
		{
			label: 'First Name',
			type: 'text',
			name: 'firstName',
			placeholder: 'Enter your first name',
		},
		{
			label: 'Last Name',
			type: 'text',
			name: 'lastName',
			placeholder: 'Enter your last name',
		},
		{
			label: 'Email Address',
			type: 'email',
			name: 'email',
			placeholder: 'Enter your email address',
		},
	]

	/* Functions */
	const onSubmit = (data: PersonalDetailsBasicInformationFormData) => {
		setIsLoading(true)
		const reqData = { ...data }

		captainPersonalDetails(reqData, {
			onSuccess: async (response: any) => {
				console.log('response', response)

				const newData = response?.data?.captain

				// 1. Save to Redux
				dispatch(
					captainOnboardingSliceActions.setFormData({
						section: 'personalDetails',
						data: {
							firstName: newData.firstName,
							lastName: newData.lastName,
							email: newData.email,
						},
					}),
				)

				// 2. Set progress done
				dispatch(
					captainOnboardingSliceActions.setSubStepCompleted({
						step: 'step1',
						substep: 'basicInfoDetails',
					}),
				)

				const updatedState: typeof onboardingState = {
					...onboardingState,
					formData: {
						...onboardingState.formData,
						personalDetails: {
							...onboardingState.formData.personalDetails,
							...newData,
						},
					},
					progress: {
						...onboardingState.progress,
						step1: {
							...onboardingState.progress.step1,
							basicInfoDetails: true,
						},
					},
				}

				await storeCaptainOnboarding(updatedState)

				navigation.navigate('CaptainOnboardingOverview')
			},
			onError: (error: any) => {
				console.log('error', error)
				console.error('Failed to create captain profile')
			},
			onSettled: () => {
				setIsLoading(false)
			},
		})
	}

	/* Side-Effects */
	useImperativeHandle(ref, () => ({
		submit: handleSubmit(onSubmit),
	}))

	return (
		<View style={{ gap: 16 * refHeightCalc }}>
			{profileFields.map((field, index) => (
				<Controller<PersonalDetailsBasicInformationFormData>
					key={index}
					control={control}
					name={field.name as keyof PersonalDetailsBasicInformationFormData}
					render={({ field: controllerField, fieldState }) => (
						<InputField
							label={field.label}
							placeholder={field.placeholder}
							value={controllerField.value}
							onChangeText={controllerField.onChange}
							onBlur={controllerField.onBlur}
							error={fieldState.error?.message}
							keyboardType={
								field.type === 'email' ? 'email-address' : 'default'
							}
						/>
					)}
				/>
			))}
		</View>
	)
})

export default CaptainPersonalBasicInfoDetails
