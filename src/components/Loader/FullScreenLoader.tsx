/* Imports */
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'

/* Relative Imports */
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

/* Local Imports */
import colors from '../../static/colors'
import { useTheme } from '../../hooks/useTheme'
import { getTypographyStyles } from '../../static/gstyles'
import { getThemeColor } from '../../utils/helpers'
import { fullScreenLoaderLottieSourceTextLines } from '../../constants/data'
import { refWidthCalc } from '../../static/dimensions'

/* Interface */
type LoaderKeys = keyof typeof fullScreenLoaderLottieSourceTextLines

interface FullScreenLoaderProps {
	sourceKey: LoaderKeys
	backgroundColor?: string | string[]
}

/**
 * Component for Full Screen Loader with animated Lottie and rotating text
 *
 * @component
 */
const FullScreenLoader = ({
	sourceKey,
	backgroundColor,
}: FullScreenLoaderProps) => {
	/* Constants */
	const isGradient = Array.isArray(backgroundColor)
	const { lottieFileSource, textLines } = fullScreenLoaderLottieSourceTextLines[
		sourceKey
	] || {
		lottieFileSource: require('../../assets/animations/FullScreenLoader.json'),
		textLines: ['Loading...'],
	}

	/* Hooks */
	const { theme } = useTheme()

	/* States */
	const [currentTextIndex, setCurrentTextIndex] = useState(0)
	const fadeAnim = useRef(new Animated.Value(0)).current

	/* Functions */
	const animate = () => {
		Animated.sequence([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
				easing: Easing.out(Easing.ease),
			}),
			Animated.delay(1200),
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
				easing: Easing.in(Easing.ease),
			}),
		]).start(() => {
			setCurrentTextIndex(prev => (prev + 1) % textLines.length)
		})
	}

	const LoaderBody = () => {
		return (
			<>
				<LottieView
					source={lottieFileSource}
					autoPlay
					loop
					style={styles.lottie}
				/>

				<Animated.Text
					style={[
						{
							opacity: fadeAnim,
						},
						getTypographyStyles(theme).bodyLargeBold,
						{
							color: getThemeColor(theme, colors.grey[400], colors.grey[300]),
						},
					]}>
					{textLines[currentTextIndex] || 'Loading...'}
				</Animated.Text>
			</>
		)
	}

	/* Side-Effects */
	useEffect(() => {
		fadeAnim.setValue(0)
		animate()

		// const interval = setInterval(animate, 2200)
		// return () => clearInterval(interval)
	}, [currentTextIndex])

	/* Output */
	return isGradient ? (
		<LinearGradient
			colors={backgroundColor || colors.gradient.blue}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}>
			<LoaderBody />
		</LinearGradient>
	) : (
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
			<LoaderBody />
		</View>
	)
}

export default FullScreenLoader

/* Styles */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20 * refWidthCalc,
		backgroundColor: colors.others.green,
	},
	lottie: {
		width: 150 * refWidthCalc,
		height: 150 * refWidthCalc,
	},
})
