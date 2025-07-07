/* Imports */
import React from 'react'
import { StyleSheet, View } from 'react-native'

/* Relative Imports */

/* Local Imports */

import colors from '../../static/colors'
import { getThemeColor } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import Button from '../Buttons/Button'
import { SvgIcon } from '../../assets'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsBottomNavigationBar = {
	leftLabel?: string
	rightLabel?: string
	centerLabel?: string
	onLeftPress?: () => void
	onRightPress?: () => void
	onCenterPress?: () => void
	disabled?: boolean
	loading?: boolean
}
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the BottomNavigationBar Screen.
 *
 * @component
 */
const BottomNavigationBar: React.FC<PropsBottomNavigationBar> = ({
	leftLabel,
	rightLabel,
	centerLabel,
	onLeftPress,
	onRightPress,
	onCenterPress,
	disabled = false,
	loading = false,
}) => {
	/* Constants */

	/* Hooks */
	const { theme } = useTheme()

	/* States */

	/* Functions */

	/* Side-Effects */

	/* Output */
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: getThemeColor(
						theme,
						colors.others.white,
						colors.dark.dark1,
					),
					borderTopColor: getThemeColor(
						theme,
						colors.grey[100],
						colors.dark.dark3,
					),
				},
			]}>
			<View style={styles.buttonContainer}>
				{centerLabel ? (
					<Button
						title={centerLabel}
						onPress={onCenterPress}
						fullWidth
						loading={loading}
						disabled={disabled}
					/>
				) : (
					<>
						<Button
							title={leftLabel ?? ''}
							onPress={onLeftPress}
							buttonStyles={{
								backgroundColor: getThemeColor(
									theme,
									colors.background.purple,
									colors.dark.dark3,
								),
							}}
							textStyles={{
								color: getThemeColor(
									theme,
									colors.primary[500],
									colors.others.white,
								),
							}}
							fullWidth
							loading={loading}
							disabled={disabled}
						/>
						<Button
							title={rightLabel ?? ''}
							onPress={onRightPress}
							fullWidth
							loading={loading}
							disabled={disabled}
						/>
					</>
				)}
			</View>
		</View>
	)
}

export default BottomNavigationBar

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 24 * refWidthCalc,
		paddingTop: 24 * refHeightCalc,
		paddingBottom: 36 * refHeightCalc,
		gap: 24 * refWidthCalc,
		borderTopWidth: 1 * refWidthCalc,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 16 * refWidthCalc,
	},
})
