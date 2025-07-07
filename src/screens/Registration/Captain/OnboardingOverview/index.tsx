/* Imports */
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'

/* Local Imports */
import { RegistrationStackParamList } from '../../../../models/navigation/RegistrationStackParamList'
import Wrapper from '../../../../components/Wrapper'
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import colors from '../../../../static/colors'
import { getTypographyStyles } from '../../../../static/gstyles'
import { getThemeColor } from '../../../../utils/helpers'
import { useTheme } from '../../../../hooks/useTheme'
import { styles } from './index.styles'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { SvgIcon } from '../../../../assets'
import BottomNavigationBar from '../../../../components/BottomTab/BottomNavigationBar'
import { useCaptainSubmitOnboarding } from '../../../../hooks/captain/onboarding/useOnboarding'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsCaptainOnboardingOverview = NativeStackScreenProps<
	RegistrationStackParamList,
	'CaptainOnboardingOverview'
>
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the CaptainOnboardingOverview Screen.
 *
 * @component
 */
const CaptainOnboardingOverview: React.FC<PropsCaptainOnboardingOverview> = ({
	navigation,
	route,
}) => {
	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const onboardingProgress = useAppSelector(state => state.captain.progress)
	const allStepsCompleted = Object.values(onboardingProgress).every(step =>
		Object.values(step).every(Boolean),
	)

	/* Constants */
	const onboardingSteps = [
		{
			step: 1,
			title: 'Personal Details',
			subtitle: 'Basic Information',
			completed: onboardingProgress.step1.basicInfoDetails,
			onPress: () => navigation.navigate('CaptainPersonalDetails'),
		},
		{
			step: 2,
			title: 'Work Preferences',
			subtitle: 'Vehicle, Area, Outlet',
			completed: Object.values(onboardingProgress.step2).every(Boolean),
			onPress: () => navigation.navigate('CaptainWorkPreferences'),
		},
		{
			step: 3,
			title: 'Bank Info',
			subtitle: 'Account & IFSC',
			completed: onboardingProgress.step3.bankInfoDetails,
			onPress: () => navigation.navigate('CaptainBankDetails'),
		},
		// {
		// 	step: 3,
		// 	title: 'KYC Documents',
		// 	subtitle: 'Aadhaar, PAN, License, Selfie',
		// 	completed: Object.values(onboardingProgress).every(step =>
		// 		Object.values(step).every(Boolean),
		// 	),
		// 	// onPress: () => navigation.navigate('CaptainKYCAadhaarUpload'),
		// },
		// {
		// 	step: 4,
		// 	title: 'Bank Info',
		// 	subtitle: 'Account & IFSC',
		// 	completed: onboardingProgress.step4.bankInfoDetails,
		// 	onPress: () => navigation.navigate('CaptainBankDetails'),
		// },
	]

	/* States */

	/* Functions */
	const processedSteps = onboardingSteps.map((step, index) => {
		const isLocked = onboardingSteps
			.slice(0, index)
			.some(prev => !prev.completed)

		let icon: JSX.Element

		if (step.completed) {
			icon = (
				<SvgIcon.Checked
					width={24 * refWidthCalc}
					height={24 * refHeightCalc}
					color={colors.primary[500]}
				/>
			)
		} else if (isLocked) {
			icon = (
				<SvgIcon.Lock
					width={24 * refWidthCalc}
					height={24 * refHeightCalc}
					color={colors.grey[500]}
				/>
			)
		} else {
			icon = (
				<SvgIcon.UnChecked
					width={24 * refWidthCalc}
					height={24 * refHeightCalc}
					color={colors.warning}
				/>
			)
		}

		return {
			...step,
			isLocked,
			icon,
		}
	})

	const { mutate: submitOnboarding, isPending } = useCaptainSubmitOnboarding()

	const onSubmit = async () => {
		if (allStepsCompleted) {
			submitOnboarding(undefined, {
				onSuccess: (response: any) => {
					console.log('response', response)
					navigation.navigate('CaptainProfileUnderReview', {
						reviewMessage: response?.data?.message,
					})
				},
				onError: (error: any) => {
					console.error('Submission failed:', error.response)
					// Optionally show a toast/snackbar here
				},
			})
		}
	}

	/* Side-Effects */

	/* Output */
	return (
		<Wrapper
			statusBarColor={colors.gradient.green[0]}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark1,
						),
					},
				]}>
				<LinearGradient
					colors={colors.gradient.green}
					style={styles.headerContainer}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Text
							style={{
								...getTypographyStyles(theme).headingH4Bold,
								color: colors.others.white,
							}}>
							Welcome to Grovia Delivery
						</Text>
						<TouchableOpacity onPress={() => {}}>
							<SvgIcon.ThreeDots
								width={24 * refWidthCalc}
								height={24 * refHeightCalc}
								color={colors.others.white}
							/>
						</TouchableOpacity>
					</View>
					<View style={{ alignItems: 'center' }}>
						<SvgIcon.Captain
							width={140 * refWidthCalc}
							height={140 * refHeightCalc}
						/>
						<Text
							style={{
								...getTypographyStyles(theme).headingH5Bold,
								color: colors.others.white,
							}}>
							Become a Captain in 4 easy Steps
						</Text>
						<Text
							style={{
								...getTypographyStyles(theme).bodyLargeRegular,
								color: colors.secondary[500],
								marginTop: 4 * refHeightCalc,
							}}>
							Complete the below steps to start
						</Text>
					</View>
				</LinearGradient>

				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 24 * refWidthCalc,
						paddingVertical: 16 * refHeightCalc,
						gap: 24 * refHeightCalc,
					}}
					showsVerticalScrollIndicator={false}>
					{processedSteps.map((step, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								if (!step.isLocked && step.onPress) step.onPress()
							}}
							activeOpacity={0.7}
							style={[
								styles.stepCardContainer,
								{
									backgroundColor: getThemeColor(
										theme,
										colors.grey[200],
										colors.dark.dark2,
									),
									opacity: step.isLocked ? 0.6 : 1,
								},
							]}>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 12 * refWidthCalc,
								}}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: 16 * refWidthCalc,
									}}>
									<View
										style={{
											borderRadius: 100 * refWidthCalc,
											paddingVertical: 8 * refWidthCalc,
											paddingHorizontal: 8 * refWidthCalc,
											backgroundColor: getThemeColor(
												theme,
												colors.grey[100],
												colors.dark.dark1,
											),
										}}>
										{step.icon}
									</View>
									<View style={{ gap: 6 * refHeightCalc }}>
										<Text style={getTypographyStyles(theme).headingH5Bold}>
											Step {step.step}: {step.title}
										</Text>
										<Text
											style={{
												...getTypographyStyles(theme).bodyLargeMedium,
												color: getThemeColor(
													theme,
													colors.grey[700],
													colors.grey[200],
												),
											}}>
											{step.subtitle}
										</Text>
									</View>
								</View>
								<SvgIcon.ArrowRight
									width={24 * refWidthCalc}
									height={24 * refHeightCalc}
									color={colors.grey[700]}
								/>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>

				<BottomNavigationBar
					centerLabel="Continue"
					onCenterPress={onSubmit}
					disabled={!allStepsCompleted}
					loading={isPending}
				/>
			</View>
		</Wrapper>
	)
}

export default CaptainOnboardingOverview
