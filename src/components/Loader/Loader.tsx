/* Imports */
import React from 'react'
import { StyleSheet } from 'react-native'

/* Relative Imports */
import LottieView from 'lottie-react-native'

/* Local Imports */
import FullScreenLoaderAnimation from '../../assets/animations/FullScreenLoader.json'

/**
 * Simple Loader Component using Lottie
 *
 * @component
 */
const Loader = () => {
	return (
		<LottieView
			source={FullScreenLoaderAnimation}
			autoPlay
			loop
			style={styles.lottie}
		/>
	)
}

export default Loader

/* Styles */
const styles = StyleSheet.create({
	lottie: {
		width: 150,
		height: 150,
	},
})
