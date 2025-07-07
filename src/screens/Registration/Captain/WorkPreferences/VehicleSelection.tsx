/* Imports */
import React, { forwardRef, useImperativeHandle } from 'react'
import {
	FlatList,
	Image,
	ListRenderItem,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

/* Relative Imports */
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import {
	WorkPreferencesVehicleTypeFormData,
	WorkPreferencesVehicleTypeFormSchema,
} from '../../../../models/viewModels/captain/onboarding'
import { RootState } from '../../../../store/store'
import { useCaptainWorkPreferencesVehicleTypeSelection } from '../../../../hooks/captain/onboarding/useOnboarding'
import { captainOnboardingSliceActions } from '../../../../store/captain/captainOnboardingSlice'
import { storeCaptainOnboarding } from '../../../../store/local/asyncStore'
import { SvgIcon } from '../../../../assets'
import colors from '../../../../static/colors'
import { getTypographyStyles } from '../../../../static/gstyles'
import { getThemeColor } from '../../../../utils/helpers'

// -------------------------------------------------------------------------------------------------------------------------

type PropsCaptainWorkPreferencesVehicleTypeSelection = {
	navigation: any
	goToNextStep: () => void
	setIsLoading: (value: boolean) => void
}

export type CaptainWorkVehicleTypeRef = {
	submit: () => void
}

const CaptainWorkPreferencesVehicleTypeSelection = forwardRef<
	CaptainWorkVehicleTypeRef,
	PropsCaptainWorkPreferencesVehicleTypeSelection
>(({ navigation, goToNextStep, setIsLoading }, ref) => {
	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<WorkPreferencesVehicleTypeFormData>({
		resolver: zodResolver(WorkPreferencesVehicleTypeFormSchema),
		defaultValues: {
			vehicleType: onboardingState.formData.workPreferences.vehicleType || '',
		},
		mode: 'onTouched',
	})

	const { mutate: vehicleTypeSelection, isPending } =
		useCaptainWorkPreferencesVehicleTypeSelection()

	/* Constants */
	const vehicleTypeOptions = [
		{
			label: 'Bike',
			value: 'bike',
			image: (
				<SvgIcon.Captain
					width={80 * refWidthCalc}
					height={80 * refHeightCalc}
				/>
			),
		},
		{
			label: 'Scooter',
			value: 'scooter',
			image: (
				<SvgIcon.Captain
					width={80 * refWidthCalc}
					height={80 * refHeightCalc}
				/>
			),
		},
		{
			label: 'Bicycle',
			value: 'bicycle',
			image: (
				<SvgIcon.Captain
					width={80 * refWidthCalc}
					height={80 * refHeightCalc}
				/>
			),
		},
	]

	/* Functions */
	const onSubmit = (data: WorkPreferencesVehicleTypeFormData) => {
		setIsLoading(true)

		vehicleTypeSelection(data, {
			onSuccess: async (response: any) => {
				const newData = response?.data

				// 1. Save to Redux
				dispatch(
					captainOnboardingSliceActions.setFormData({
						section: 'workPreferences',
						data: { vehicleType: newData.vehicleType },
					}),
				)

				// 2. Set progress done
				dispatch(
					captainOnboardingSliceActions.setSubStepCompleted({
						step: 'step2',
						substep: 'vehicleType',
					}),
				)

				// 3. Store in async
				const updatedState: typeof onboardingState = {
					...onboardingState,
					formData: {
						...onboardingState.formData,
						workPreferences: {
							...onboardingState.formData.workPreferences,
							vehicleType: newData.vehicleType,
						},
					},
					progress: {
						...onboardingState.progress,
						step2: {
							...onboardingState.progress.step2,
							vehicleType: true,
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

	const renderItem: ListRenderItem<(typeof vehicleTypeOptions)[number]> = ({
		item,
	}) => (
		<Controller
			control={control}
			name="vehicleType"
			render={({ field: { onChange, value } }) => (
				<TouchableOpacity
					onPress={() => onChange(item.value)}
					activeOpacity={0.8}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingVertical: 24 * refHeightCalc,
						paddingHorizontal: 24 * refWidthCalc,
						borderRadius: 12 * refWidthCalc,
						marginBottom: 16 * refHeightCalc,
						backgroundColor: getThemeColor(
							theme,
							colors.grey[200],
							colors.dark.dark2,
						),
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 16 * refWidthCalc,
						}}>
						{item.image}
						<Text style={getTypographyStyles(theme).headingH5Bold}>
							{item.label}
						</Text>
					</View>

					<View
						style={{
							borderRadius: 100,
							padding: 6,
							backgroundColor: getThemeColor(
								theme,
								colors.grey[100],
								colors.dark.dark1,
							),
						}}>
						{value === item.value ? (
							<SvgIcon.Checked
								width={24 * refWidthCalc}
								height={24 * refHeightCalc}
								color={colors.primary[500]}
							/>
						) : (
							<SvgIcon.UnChecked
								width={24 * refWidthCalc}
								height={24 * refHeightCalc}
								color={colors.primary[500]}
							/>
						)}
					</View>
				</TouchableOpacity>
			)}
		/>
	)

	/* Side-Effects */
	useImperativeHandle(ref, () => ({
		submit: handleSubmit(onSubmit),
	}))

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={vehicleTypeOptions}
				renderItem={renderItem}
				keyExtractor={item => item.value}
			/>
		</View>
	)
})

export default CaptainWorkPreferencesVehicleTypeSelection
