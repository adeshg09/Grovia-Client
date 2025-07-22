/* Imports */
import React from 'react'
import { StyleSheet, Platform, Text, TouchableOpacity } from 'react-native'

/* Relative Imports */
import Icon from 'react-native-vector-icons/Ionicons'

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import colors from '../../../../static/colors'
import {
	refWidthCalc,
	refHeightCalc,
	windowHeight,
} from '../../../../static/dimensions'
import { getTypographyStyles } from '../../../../static/gstyles'
import Animated from 'react-native-reanimated'
// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsBackToTopButton {
	scrollY: { value: number }
	backToTopStyle: any
	expand: () => void
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Back To Top Button.
 *
 * @component
 */
const BackToTopButton: React.FC<PropsBackToTopButton> = ({
	scrollY,
	backToTopStyle,
	expand,
}) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Output */
	return (
		<Animated.View
			style={[
				styles.backToTopButtonContainer,
				{
					backgroundColor: colors.dark.dark3,
				},
				backToTopStyle,
			]}>
			<TouchableOpacity
				onPress={() => {
					scrollY.value = 0
					expand()
				}}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 6 * refWidthCalc,
					paddingVertical: 6 * refHeightCalc,
					paddingHorizontal: 4 * refWidthCalc,
				}}>
				<Icon
					name="arrow-up-circle-outline"
					color={colors.grey[200]}
					size={16 * refWidthCalc}
				/>
				<Text
					style={{
						...getTypographyStyles(theme).bodySmallBold,
						color: colors.grey[200],
					}}>
					Back to top
				</Text>
			</TouchableOpacity>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	backToTopButtonContainer: {
		position: 'absolute',
		alignSelf: 'center',
		backgroundColor: 'black',
		bottom: Platform.OS === 'ios' ? windowHeight * 0.18 : 100,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4 * refWidthCalc,
		borderRadius: 20 * refWidthCalc,
		paddingHorizontal: 10 * refWidthCalc,
		paddingVertical: 5 * refHeightCalc,
		zIndex: 999,
	},
})

export default BackToTopButton
