/* Imports */
import React, { forwardRef, useImperativeHandle } from 'react'
import { View } from 'react-native'

/* Relative Imports */
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

/* Local Imports */
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import { storeCaptainOnboarding } from '../../../../store/local/asyncStore'
import { useTheme } from '../../../../hooks/useTheme'
import { RootState } from '../../../../store/store'
import {
	WorkPreferencesCityFormData,
	WorkPreferencesCityFormSchema,
} from '../../../../models/viewModels/captain/onboarding'
import { useCaptainWorkPreferencesCitySelection } from '../../../../hooks/captain/onboarding/useOnboarding'
import { captainOnboardingSliceActions } from '../../../../store/captain/captainOnboardingSlice'
import SelectableCard from './components/SelectableCard'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsCaptainWorkPreferencesCitySelection = {
	navigation: any
	goToNextStep: () => void
	setIsLoading: (value: boolean) => void
}

export type CaptainWorkCityRef = {
	submit: () => void
}
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the CaptainWorkCitySelection Screen.
 *
 * @component
 */
const CaptainWorkPreferencesCitySelection = forwardRef<
	CaptainWorkCityRef,
	PropsCaptainWorkPreferencesCitySelection
>(({ navigation, goToNextStep, setIsLoading }, ref) => {
	/* Constants */

	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<WorkPreferencesCityFormData>({
		resolver: zodResolver(WorkPreferencesCityFormSchema),
		defaultValues: {
			workCity: onboardingState.formData.workPreferences.workCity || 'Pune',
		},
	})

	const { mutate: workCitySelection } = useCaptainWorkPreferencesCitySelection()

	/* States */

	/* Functions */
	const onSubmit = (data: WorkPreferencesCityFormData) => {
		setIsLoading(true)
		workCitySelection(data, {
			onSuccess: async (response: any) => {
				const newData = response?.data
				console.log('Work City Selection Response:', newData)

				// 1. Save to Redux
				dispatch(
					captainOnboardingSliceActions.setFormData({
						section: 'workPreferences',
						data: { workCity: newData.workCity },
					}),
				)

				// 2. Set progress done
				dispatch(
					captainOnboardingSliceActions.setSubStepCompleted({
						step: 'step2',
						substep: 'workCity',
					}),
				)

				const updatedState: typeof onboardingState = {
					...onboardingState,
					formData: {
						...onboardingState.formData,
						workPreferences: {
							...onboardingState.formData.workPreferences,
							workCity: newData.workCity,
						},
					},
					progress: {
						...onboardingState.progress,
						step2: {
							...onboardingState.progress.step2,
							workCity: true,
						},
					},
				}

				await storeCaptainOnboarding(updatedState)

				// 4. Move to next step
				goToNextStep()
			},
			onError: err => {
				console.error('Work city update failed', err)
			},
			onSettled: () => setIsLoading(false),
		})
	}

	useImperativeHandle(ref, () => ({
		submit: handleSubmit(onSubmit),
	}))

	/* Side-Effects */

	/* Output */
	return (
		<View style={{ flex: 1 }}>
			<Controller
				control={control}
				name="workCity"
				render={({ field: { onChange, value } }) => (
					<SelectableCard
						label="Pune"
						selected={value === 'Pune'}
						onPress={() => onChange('Pune')}
					/>
				)}
			/>
		</View>
	)
})

export default CaptainWorkPreferencesCitySelection
