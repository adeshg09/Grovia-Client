/* Imports */
import React from 'react'
import { StyleSheet, View } from 'react-native'

/* Relative Imports */
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

/* Local Imports */
import colors from '../../static/colors'
import FullScreenLoaderAnimation from '../../assets/animations/FullScreenLoader.json'

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component for Full Screen Activity Indicator / Loader
 *
 * @component
 */
const FullScreenLoader = ({
	backgroundColor,
}: {
	backgroundColor?: string | string[]
}) => {
	/* Output */
	const isGradient = Array.isArray(backgroundColor)

	return isGradient || backgroundColor === undefined ? (
		<LinearGradient
			colors={backgroundColor || colors.gradient.blue}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}>
			<LottieView
				source={FullScreenLoaderAnimation}
				autoPlay
				loop
				style={styles.lottie}
			/>
		</LinearGradient>
	) : (
		<View style={[styles.container, { backgroundColor }]}>
			<LottieView
				source={FullScreenLoaderAnimation}
				autoPlay
				loop
				style={styles.lottie}
			/>
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
	},
	lottie: {
		width: 150,
		height: 150,
	},
})
