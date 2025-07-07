/* Imports */
import React, { useState } from 'react'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import { AuthStackParamList } from '../../models/navigation/AuthStackParamList'
import Wrapper from '../../components/Wrapper'
import colors from '../../static/colors'
import { getThemeColor } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'
import OnboardingScreen from './components/OnboardingScreen'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsOnboarding = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Onboarding Screen.
 *
 * @component
 */
const Onboarding: React.FC<PropsOnboarding> = ({ navigation, route }) => {
	/* Constants */
	const screens = [
		{
			image: {
				light: require('../../assets/images/onboardingLight1.png'),
				dark: require('../../assets/images/onboardingDark1.png'),
			},
			title: 'Grovia – Where Stories Start',
			description:
				'Post, Reels, Stories, or Live — express every moment your way. Grovia is your all-in-one creative stage to connect, create, and shine.',
		},
		{
			image: {
				light: require('../../assets/images/onboardingLight2.png'),
				dark: require('../../assets/images/onboardingDark2.png'),
			},
			title: 'Real-Time Vibes, Real Connections',
			description:
				'From chats to calls — voice, video, or text — Grovia brings your circle closer. React, share, save, and stay in the loop effortlessly.',
		},
		{
			image: {
				light: require('../../assets/images/onboardingLight3.png'),
				dark: require('../../assets/images/onboardingDark3.png'),
			},
			title: 'Your Feed, Your Flow',
			description:
				'Personalize your vibe with sleek light & dark themes, explore content your way, and enjoy a fluid social journey built just for you.',
		},
	]

	/* Hooks */
	const { theme } = useTheme()

	/* States */
	const [currentScreen, setCurrentScreen] = useState(0)

	/* Functions */

	/* Side-Effects */

	/* Output */
	return (
		<Wrapper
			statusBarColor={colors.primary[900]}
			statusBarStyle="light-content">
			<OnboardingScreen
				navigation={navigation}
				image={screens[currentScreen].image}
				title={screens[currentScreen].title}
				description={screens[currentScreen].description}
				currentScreen={currentScreen}
				setCurrentScreen={setCurrentScreen}
				totalScreens={screens.length}
			/>
		</Wrapper>
	)
}

export default Onboarding
