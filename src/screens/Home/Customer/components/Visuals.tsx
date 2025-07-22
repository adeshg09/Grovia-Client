/* Imports */
import React from 'react'
import { StyleSheet, Animated, Image } from 'react-native'

/* Relative Imports */
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

/* Local Imports */
import colors from '../../../../static/colors'
import {
	refHeightCalc,
	windowHeight,
	windowWidth,
} from '../../../../static/dimensions'
import { useWeatherData } from '../../../../hooks/useWeatherData'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsVisuals {}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Visuals.
 *
 * @component
 */
const Visuals: React.FC<PropsVisuals> = () => {
	/* Constants */

	/* Hooks */
	const { scrollY } = useCollapsibleContext()
	const headerAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, 120], [1, 0])
		return { opacity }
	})
	const { weatherData } = useWeatherData()

	console.log('Weather Data: ', weatherData)

	/* Output */
	return (
		<Animated.View style={[styles.container, headerAnimatedStyle]}>
			<LinearGradient
				colors={colors.darkWeatherColors}
				style={styles.gradient}
			/>
			<Image
				source={require('../../../../assets/images/cloud.png')}
				style={styles.cloud}
			/>
			<LottieView
				autoPlay={true}
				enableMergePathsAndroidForKitKatAndAbove={true}
				loop={true}
				style={styles.lottie}
				source={require('../../../../assets/animations/raining.json')}
			/>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
	},
	lottie: {
		width: '100%',
		height: 150 * refHeightCalc,
		position: 'absolute',
		transform: [{ scaleX: -1 }],
	},
	gradient: {
		width: '100%',
		height: windowHeight * 0.4,
		position: 'absolute',
	},
	cloud: {
		width: windowWidth,
		resizeMode: 'stretch',
		height: 100 * refHeightCalc,
	},
})

export default Visuals
