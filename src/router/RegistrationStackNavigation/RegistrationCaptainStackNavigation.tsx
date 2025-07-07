/* Imports */
import React, { useEffect, useState } from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RegistrationStackParamList } from '../../models/navigation/RegistrationStackParamList'
import CaptainPersonalDetails from '../../screens/Registration/Captain/PersonalDetails'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { captainOnboardingSliceActions } from '../../store/captain/captainOnboardingSlice'
import { loadCaptainOnboarding } from '../../store/local/asyncStore'
import FullScreenLoader from '../../components/Loader/FullScreenLoader'
import { getThemeColor } from '../../utils/helpers'
import colors from '../../static/colors'
import { useTheme } from '../../hooks/useTheme'
import CaptainBankDetails from '../../screens/Registration/Captain/BankDetails'
import CaptainOnboardingOverview from '../../screens/Registration/Captain/OnboardingOverview'
import CaptainWorkPreferences from '../../screens/Registration/Captain/WorkPreferences'
import CaptainProfileUnderReview from '../../screens/Registration/Captain/ProfileUnderReview'

/* Local Imports */

// -------------------------------------------------------------------------------------------------------------------------

const RegistrationCaptainStackNavigator =
	createNativeStackNavigator<RegistrationStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const RegistrationCaptainStackNavigation: React.FC = () => {
	const { theme, toggleTheme } = useTheme()
	const dispatch = useAppDispatch()
	const [isHydrated, setIsHydrated] = useState(false)
	const onboardingProgress = useAppSelector(state => state.captain.progress)
	const allStepsCompleted = Object.values(onboardingProgress).every(step =>
		Object.values(step).every(Boolean),
	)

	useEffect(() => {
		const hydrateOnboarding = async () => {
			const onboardData = await loadCaptainOnboarding()
			console.log('onboardData', onboardData)
			if (onboardData) {
				dispatch(captainOnboardingSliceActions.restoreOnboarding(onboardData))
			}
			setIsHydrated(true)
		}

		hydrateOnboarding()
	}, [])

	if (!isHydrated)
		return (
			<FullScreenLoader
				backgroundColor={getThemeColor(
					theme,
					colors.others.white,
					colors.dark.dark2,
				)}
			/>
		)
	/* Output */
	return (
		<RegistrationCaptainStackNavigator.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={
				allStepsCompleted
					? 'CaptainProfileUnderReview'
					: 'CaptainOnboardingOverview'
			}>
			<RegistrationCaptainStackNavigator.Screen
				name="CaptainOnboardingOverview"
				component={CaptainOnboardingOverview}
			/>

			<RegistrationCaptainStackNavigator.Screen
				name="CaptainPersonalDetails"
				component={CaptainPersonalDetails}
			/>

			<RegistrationCaptainStackNavigator.Screen
				name="CaptainWorkPreferences"
				component={CaptainWorkPreferences}
			/>

			{/* <RegistrationCaptainStackNavigator.Screen
				name="CaptainKycDetails"
				component={CaptainWorkPreferences}
			/> */}

			<RegistrationCaptainStackNavigator.Screen
				name="CaptainBankDetails"
				component={CaptainBankDetails}
			/>
			<RegistrationCaptainStackNavigator.Screen
				name="CaptainProfileUnderReview"
				component={CaptainProfileUnderReview}
			/>
		</RegistrationCaptainStackNavigator.Navigator>
	)
}

export default RegistrationCaptainStackNavigation
