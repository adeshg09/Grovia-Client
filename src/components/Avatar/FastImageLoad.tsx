/* Imports */
import React from 'react'
import { StyleProp, StyleSheet } from 'react-native'

/* Relative Imports */
import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image'

type Props = {
	style?: StyleProp<ImageStyle>
	uri: string
} & FastImageProps

/* Components */
const FastImageLoad: React.FC<Props> = ({ uri, style = {}, ...rest }) => {
	/* Output */
	return (
		<FastImage
			source={{ uri: uri, priority: FastImage.priority.normal }}
			style={[styles.image, style]}
			resizeMode={FastImage.resizeMode.cover}
			{...rest}
		/>
	)
}
/* Styles */
const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: '100%',
	},
})

export default FastImageLoad
