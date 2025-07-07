/* Imports */
import React from 'react'
import {
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../hooks/useTheme'
import { refWidthCalc, refHeightCalc } from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsHeader = {
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	label?: string
	containerStyle?: ViewStyle
	titleStyle?: TextStyle
	onPressLeft?: () => void
	onPressRight?: () => void
	disabled?: boolean
}
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Header Screen.
 *
 * @component
 */
const Header: React.FC<PropsHeader> = ({
	leftIcon,
	rightIcon,
	label,
	containerStyle,
	titleStyle,
	onPressLeft,
	onPressRight,
	disabled = false,
}) => {
	/* Constants */

	/* Hooks */
	const { theme } = useTheme()

	/* States */

	/* Functions */

	/* Side-Effects */

	/* Output */
	return (
		<View style={[styles.headerContainer, containerStyle]}>
			<TouchableOpacity
				onPress={onPressLeft}
				style={styles.iconContainer}
				disabled={disabled}>
				{leftIcon}
			</TouchableOpacity>
			<Text
				style={{
					...getTypographyStyles(theme).headingH4Bold,
					...titleStyle,
				}}>
				{label}
			</Text>
			<TouchableOpacity
				onPress={onPressRight}
				style={styles.iconContainer}
				disabled={disabled}>
				{rightIcon}
			</TouchableOpacity>
		</View>
	)
}

export default Header

/* Styles */
const styles = StyleSheet.create({
	headerContainer: {
		paddingVertical: 12 * refHeightCalc,
		gap: 16 * refWidthCalc,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
