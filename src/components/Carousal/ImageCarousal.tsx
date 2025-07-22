/* Imports */
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

/* Relative Imports */
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'

/* Local Imports */
import {
	refHeightCalc,
	refWidthCalc,
	windowWidth,
} from '../../static/dimensions'
import ScalePress from '../Buttons/ScalePress'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsImageCarousal {
	carousalData: any
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the ImageCarousal.
 *
 * @component
 */
const ImageCarousal: React.FC<PropsImageCarousal> = ({ carousalData }) => {
	/* Constants */
	const baseOptions = {
		vertical: false,
		width: windowWidth,
		height: windowWidth * 0.5,
	}
	/* Hooks */
	const progressValue = useSharedValue(0)

	/* Output */
	return (
		<View
			style={{
				marginHorizontal: -24 * refWidthCalc,
			}}>
			<Carousel
				{...baseOptions}
				loop
				pagingEnabled
				snapEnabled
				autoPlay
				autoPlayInterval={3000}
				mode="parallax"
				data={carousalData}
				modeConfig={{
					parallaxScrollingOffset: 0,
					parallaxScrollingScale: 0.89,
				}}
				renderItem={({ item }: any) => {
					return (
						<ScalePress style={styles.imageContainer}>
							<Image source={item} style={styles.img} />
						</ScalePress>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	imageContainer: {
		width: '100%',
		height: '100%',
	},
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 20 * refWidthCalc,
	},
})

export default ImageCarousal
