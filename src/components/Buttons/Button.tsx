/* Imports */
import React from 'react'
import {
	StyleProp,
	ViewStyle,
	TextStyle,
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../hooks/useTheme'
import colors from '../../static/colors'
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsButton = {
	title: string
	onPress?: () => void
	disabled?: boolean
	loading?: boolean
	buttonStyles?: StyleProp<ViewStyle>
	textStyles?: StyleProp<TextStyle>
	iconLeft?: any
	iconRight?: any
	accessibilityLabel?: string
	testID?: string
	fullWidth?: boolean
}
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Button Screen.
 *
 * @component
 */
const Button: React.FC<PropsButton> = ({
	title,
	onPress,
	disabled = false,
	loading = false,
	buttonStyles,
	textStyles,
	iconLeft,
	iconRight,
	accessibilityLabel,
	testID,
	fullWidth = false,
}) => {
	/* Constants */

	/* Hooks */
	const { theme } = useTheme()

	/* States */

	/* Functions */

	/* Side-Effects */

	/* Output */
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			disabled={disabled || loading}
			style={[
				styles.button,
				fullWidth && { flex: 1 },
				disabled && styles.disabledButton,
				buttonStyles,
			]}
			accessibilityLabel={accessibilityLabel ?? title}
			accessibilityState={{ disabled: disabled || loading }}
			testID={testID}>
			{loading ? (
				<ActivityIndicator color={colors.others.white} />
			) : (
				<View style={styles.content}>
					{iconLeft && iconLeft}
					<Text
						style={[
							getTypographyStyles(theme).bodyLargeBold,
							{ color: colors.others.white },
							textStyles,
						]}>
						{title}
					</Text>
					{iconRight && iconRight}
				</View>
			)}
		</TouchableOpacity>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary[500],
		paddingVertical: 20 * refHeightCalc,
		paddingHorizontal: 20 * refWidthCalc,
		borderRadius: 1000 * refWidthCalc,
		alignItems: 'center',
	},
	disabledButton: {
		backgroundColor: colors.disabledButton,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	iconLeft: {
		marginRight: 8 * refWidthCalc,
	},
	iconRight: {
		marginLeft: 8 * refWidthCalc,
	},
})
