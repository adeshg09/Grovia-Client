import React, { forwardRef, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import { useTheme } from '../../../../hooks/useTheme'
import {
	BankDetailsInformationFormSchema,
	BankDetailsInformationFormData,
} from '../../../../models/viewModels/captain/onboarding'
import InputField from '../../../../components/InputField/InputField'
import { useCaptainBankDetails } from '../../../../hooks/captain/onboarding/useOnboarding'
import { captainOnboardingSliceActions } from '../../../../store/captain/captainOnboardingSlice'
import { storeCaptainOnboarding } from '../../../../store/local/asyncStore'
import { RootState } from '../../../../store/store'
import { refHeightCalc } from '../../../../static/dimensions'

type Props = {
	navigation: any
	setIsLoading: (value: boolean) => void
}

export type CaptainBankBasicDetailsRef = {
	submit: () => void
}

const CaptainBankBasicDetails = forwardRef<CaptainBankBasicDetailsRef, Props>(
	({ navigation, setIsLoading }, ref) => {
		const { theme } = useTheme()
		const dispatch = useAppDispatch()
		const onboardingState = useAppSelector((state: RootState) => state.captain)

		const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm<BankDetailsInformationFormData>({
			resolver: zodResolver(BankDetailsInformationFormSchema),
			defaultValues: {
				accountHolderName:
					onboardingState.formData.bankDetails.accountHolderName,
				accountNumber: onboardingState.formData.bankDetails.accountNumber,
				ifscCode: onboardingState.formData.bankDetails.ifscCode,
				bankName: onboardingState.formData.bankDetails.bankName,
			},
			mode: 'onChange',
		})

		const { mutate: updateBankDetails } = useCaptainBankDetails()

		const fields = [
			{ name: 'accountHolderName', label: 'Account Holder Name', type: 'text' },
			{ name: 'accountNumber', label: 'Account Number', type: 'number' },
			{ name: 'ifscCode', label: 'IFSC Code', type: 'text' },
			{ name: 'bankName', label: 'Bank Name', type: 'text' },
		]

		const onSubmit = (data: BankDetailsInformationFormData) => {
			setIsLoading(true)
			const reqData = { bankDetails: data }

			updateBankDetails(reqData, {
				onSuccess: async response => {
					console.log('Bank details updated successfully', response)
					const newData = response?.data?.bankDetails

					dispatch(
						captainOnboardingSliceActions.setFormData({
							section: 'bankDetails',
							data: {
								accountHolderName: newData.accountHolderName,
								bankName: newData.bankName,
								accountNumber: newData.accountNumber,
								ifscCode: newData.ifscCode,
								upiId: newData.upiId,
							},
						}),
					)

					dispatch(
						captainOnboardingSliceActions.setSubStepCompleted({
							step: 'step3',
							substep: 'bankInfoDetails',
						}),
					)

					const updatedState = {
						...onboardingState,
						formData: {
							...onboardingState.formData,
							bankDetails: {
								...onboardingState.formData.bankDetails,
								...newData,
							},
						},
						progress: {
							...onboardingState.progress,
							step3: {
								...onboardingState.progress.step3,
								bankInfoDetails: true,
							},
						},
					}

					await storeCaptainOnboarding(updatedState)

					navigation.navigate('CaptainOnboardingOverview')
				},
				onError: err => {
					console.error('Bank update failed', err.response)
				},
				onSettled: () => setIsLoading(false),
			})
		}

		useImperativeHandle(ref, () => ({
			submit: handleSubmit(onSubmit),
		}))

		return (
			<View style={{ gap: 16 * refHeightCalc }}>
				{fields.map((field, i) => (
					<Controller
						key={i}
						control={control}
						name={field.name as keyof BankDetailsInformationFormData}
						render={({ field: controllerField, fieldState }) => (
							<InputField
								label={field.label}
								placeholder={`Enter ${field.label}`}
								value={
									field.name === 'ifscCode'
										? controllerField.value?.toUpperCase?.() || ''
										: controllerField.value
								}
								onChangeText={text =>
									controllerField.onChange(
										field.name === 'ifscCode' ? text.toUpperCase() : text,
									)
								}
								onBlur={controllerField.onBlur}
								error={fieldState.error?.message}
								keyboardType={
									field.type === 'number' ? 'number-pad' : 'default'
								}
							/>
						)}
					/>
				))}
			</View>
		)
	},
)

export default CaptainBankBasicDetails
