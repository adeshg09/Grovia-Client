/* Imports */
import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

/* Relative Imports */

/* Local Imports */
import colors from '../../static/colors'
import { refWidthCalc } from '../../static/dimensions'
import FastImageLoad from './FastImageLoad'
// -------------------------------------------------------------------------------------------------------------------------

interface IPropsAvatar {
	avatarUrl: string
	extraStyles?: StyleProp<ViewStyle>
	initial?: string
}
/**
 * Component to create Avatar.
 *
 * @component
 */
const Avatar: React.FC<IPropsAvatar> = ({
	avatarUrl,
	extraStyles = {},
	initial = '',
}) => {
	const getInitialLetter = () => {
		if (initial && initial?.length > 0) {
			return initial[0].toUpperCase()
		}
		return ''
	}
	/* Output */
	return (
		<View style={[styles.imageContainer, extraStyles]}>
			{avatarUrl ? (
				<FastImageLoad
					style={styles.imageStyle}
					uri={avatarUrl}
					resizeMode="cover"
				/>
			) : (
				<Text style={styles.initialText}>{getInitialLetter()}</Text>
			)}
		</View>
	)
}

export default Avatar

/* Styles */
const styles = StyleSheet.create({
	imageContainer: {
		marginRight: 2,
		width: 24 * refWidthCalc,
		aspectRatio: 1,
		borderRadius: 24 * refWidthCalc,
		backgroundColor: colors.grey[200],
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageStyle: {
		width: '100%',
		height: '100%',
	},
	initialText: {
		color: colors.primary[900],
	},
})
