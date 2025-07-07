/* Imports */
import React, { forwardRef, useImperativeHandle } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'

/* Relative Imports */
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import {
	WorkPreferencesOutletFormData,
	WorkPreferencesOutletFormSchema,
} from '../../../../models/viewModels/captain/onboarding'
import { RootState } from '../../../../store/store'
import {
	useCaptainWorkPreferencesOutletList,
	useCaptainWorkPreferencesOutletSelection,
} from '../../../../hooks/captain/onboarding/useOnboarding'
import { captainOnboardingSliceActions } from '../../../../store/captain/captainOnboardingSlice'
import { storeCaptainOnboarding } from '../../../../store/local/asyncStore'
import SelectableCard from './components/SelectableCard'
import Loader from '../../../../components/Loader/Loader'

// -------------------------------------------------------------------------------------------------------------------------

type PropsCaptainWorkPreferencesOutletSelection = {
	navigation: any
	goToNextStep: () => void
	setIsLoading: (value: boolean) => void
}

export type CaptainWorkOutleteRef = {
	submit: () => void
}

const CaptainWorkPreferencesOutletSelection = forwardRef<
	CaptainWorkOutleteRef,
	PropsCaptainWorkPreferencesOutletSelection
>(({ navigation, goToNextStep, setIsLoading }, ref) => {
	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<WorkPreferencesOutletFormData>({
		resolver: zodResolver(WorkPreferencesOutletFormSchema),
		defaultValues: {
			outletId: onboardingState.formData.workPreferences.outletId || '',
		},
		mode: 'onTouched',
	})

	const workCity = onboardingState.formData.workPreferences.workCity
	console.log('Work City:', workCity)
	const { data: outletList = [], isLoading } =
		useCaptainWorkPreferencesOutletList(workCity)

	console.log('Outlet List:', outletList)

	const { mutate: outletSelection } = useCaptainWorkPreferencesOutletSelection()

	/* Constants */

	/* Functions */
	const onSubmit = (data: WorkPreferencesOutletFormData) => {
		setIsLoading(true)

		outletSelection(data, {
			onSuccess: async (response: any) => {
				const newData = response?.data

				// 1. Save to Redux
				dispatch(
					captainOnboardingSliceActions.setFormData({
						section: 'workPreferences',
						data: { outletId: newData.outletId },
					}),
				)

				// 2. Set progress done
				dispatch(
					captainOnboardingSliceActions.setSubStepCompleted({
						step: 'step2',
						substep: 'outletId',
					}),
				)

				// 3. Store in async
				const updatedState: typeof onboardingState = {
					...onboardingState,
					formData: {
						...onboardingState.formData,
						workPreferences: {
							...onboardingState.formData.workPreferences,
							outletId: newData.outletId,
						},
					},
					progress: {
						...onboardingState.progress,
						step2: {
							...onboardingState.progress.step2,
							outletId: true,
						},
					},
				}
				await storeCaptainOnboarding(updatedState)

				// 4. Move to next step
				goToNextStep()
			},
			onError: (err: any) => {
				console.error('Vehicle type update failed', err)
			},
			onSettled: () => {
				setIsLoading(false)
			},
		})
	}

	const renderItem: ListRenderItem<(typeof outletList)[number]> = ({
		item,
	}) => (
		<Controller
			control={control}
			name="outletId"
			render={({ field: { onChange, value } }) => (
				<SelectableCard
					label={item.name}
					selected={value === item.id}
					onPress={() => onChange(item.id)}
				/>
			)}
		/>
	)

	/* Side-Effects */
	useImperativeHandle(ref, () => ({
		submit: handleSubmit(onSubmit),
	}))

	return (
		<>
			{isLoading ? (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Loader />
				</View>
			) : (
				<FlatList
					data={outletList}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
			)}
		</>
	)
})

export default CaptainWorkPreferencesOutletSelection
