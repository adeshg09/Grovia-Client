/* Imports */
import React, { useEffect, useRef } from 'react'
import { Animated, StatusBar, Text, View } from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../../hooks/useTheme'
import { getThemeColor } from '../../../utils/helpers'
import BottomNavigationBar from '../../../components/BottomTab/BottomNavigationBar'
import colors from '../../../static/colors'
import { getTypographyStyles } from '../../../static/gstyles'
import { refHeightCalc } from '../../../static/dimensions'
import { styles } from '../index.styles'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsOnboardingScreen = {
	navigation: any
	image: any
	title: string
	description: string
	currentScreen: number
	setCurrentScreen: React.Dispatch<React.SetStateAction<number>>
	totalScreens: number
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Onboarding Screen resuable component.
 *
 * @component
 */
const OnboardingScreen: React.FC<PropsOnboardingScreen> = ({
	navigation,
	image,
	title,
	description,
	currentScreen,
	setCurrentScreen,
	totalScreens,
}) => {
	/* Constants */

	/* Hooks */
	const { theme, toggleTheme } = useTheme()
	// Image Animation
	const imageTranslateY = useRef(new Animated.Value(100)).current
	const imageOpacity = useRef(new Animated.Value(0)).current

	// Title Animation
	const titleScale = useRef(new Animated.Value(0.6)).current
	const titleOpacity = useRef(new Animated.Value(0)).current

	// Description Animation
	const descTranslateX = useRef(new Animated.Value(50)).current
	const descOpacity = useRef(new Animated.Value(0)).current

	/* States */

	/* Functions */
	const handleNextScreen = () => {
		if (currentScreen < totalScreens - 1) {
			setCurrentScreen(currentScreen + 1)
		} else {
			navigation.navigate('AuthWelcome')
		}
	}

	const handlePrevScreen = () => {
		if (currentScreen > 0) {
			setCurrentScreen(currentScreen - 1)
		}
	}

	const handleSkip = () => {
		navigation.navigate('AuthWelcome')
	}

	/* Side-Effects */
	useEffect(() => {
		// Reset animation values before animating
		imageTranslateY.setValue(100)
		imageOpacity.setValue(0)

		Animated.parallel([
			// Image
			Animated.timing(imageTranslateY, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
			Animated.timing(imageOpacity, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
			}),

			// // Title zoom-in
			// Animated.timing(titleScale, {
			// 	toValue: 1,
			// 	duration: 700,
			// 	delay: 300,
			// 	useNativeDriver: true,
			// }),
			// Animated.timing(titleOpacity, {
			// 	toValue: 1,
			// 	duration: 700,
			// 	delay: 300,
			// 	useNativeDriver: true,
			// }),

			// // Description slide-in
			// Animated.timing(descTranslateX, {
			// 	toValue: 0,
			// 	duration: 700,
			// 	delay: 500,
			// 	useNativeDriver: true,
			// }),
			// Animated.timing(descOpacity, {
			// 	toValue: 1,
			// 	duration: 700,
			// 	delay: 500,
			// 	useNativeDriver: true,
			// }),
		]).start()
	}, [currentScreen])

	/* Output */
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.primary[900],
				},
			]}>
			{/* <StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="dark-content"
			/> */}
			<View style={styles.imageContainer}>
				<Animated.Image
					source={theme === 'light' ? image.light : image.dark}
					resizeMode="contain"
					style={[
						styles.image,
						{
							transform: [{ translateY: imageTranslateY }],
							opacity: imageOpacity,
						},
					]}
				/>
			</View>
			<View
				style={[
					styles.contentContainer,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark1,
						),
					},
				]}>
				<View style={styles.contentBox}>
					<View
						style={{
							gap: 12 * refHeightCalc,
						}}>
						<Text
							style={{
								...getTypographyStyles(theme).headingH3Bold,
								color: getThemeColor(
									theme,
									colors.grey[900],
									colors.others.white,
								),
								textAlign: 'center',
								// opacity: titleOpacity,
								// transform: [{ scale: titleScale }],
							}}>
							{title}
						</Text>
						<Text
							style={{
								...getTypographyStyles(theme).bodyXlargeRegular,
								color: getThemeColor(theme, colors.grey[700], colors.grey[200]),
								textAlign: 'center',
								// opacity: descOpacity,
								// transform: [{ translateX: descTranslateX }],
							}}>
							{description}
						</Text>
					</View>
					<View style={styles.dotContainer}>
						{Array(totalScreens)
							.fill(0)
							.map((_, index) => (
								<View
									key={index}
									style={[
										styles.dot,
										{
											backgroundColor: getThemeColor(
												theme,
												colors.grey[200],
												colors.dark.dark5,
											),
										},
										index === currentScreen && styles.activeDot,
									]}
								/>
							))}
					</View>
				</View>

				{currentScreen === totalScreens - 1 ? (
					<BottomNavigationBar
						centerLabel="Get Started"
						onCenterPress={handleNextScreen}
					/>
				) : (
					<BottomNavigationBar
						leftLabel={currentScreen === 0 ? 'Skip' : 'Back'}
						rightLabel="Continue"
						onLeftPress={currentScreen === 0 ? handleSkip : handlePrevScreen}
						onRightPress={handleNextScreen}
					/>
				)}
			</View>
		</View>
	)
}

export default OnboardingScreen
