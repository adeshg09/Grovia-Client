import React from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'

import { useTheme } from '../../hooks/useTheme'
import colors from '../../static/colors'
import {
	refHeightCalc,
	refWidthCalc,
	windowWidth,
} from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'
import { getThemeColor } from '../../utils/helpers'
import Button from '../Buttons/Button'

interface CustomModalProps {
	visible: boolean
	onClose: () => void
	title?: string
	subTitle?: string
	buttonLabel?: string
	onButtonPress?: () => void
	icon?: React.ReactNode
	additionalButtons?: React.ReactNode
}

const CustomModal: React.FC<CustomModalProps> = ({
	visible,
	onClose,
	title,
	subTitle,
	buttonLabel,
	onButtonPress,
	icon,
	additionalButtons,
}) => {
	const { theme } = useTheme()

	return (
		<Modal
			animationType="fade"
			transparent
			visible={visible}
			onRequestClose={onClose}>
			<View style={styles.overlay}>
				<View
					style={[
						styles.modalContainer,
						{
							backgroundColor: getThemeColor(
								theme,
								colors.others.white,
								colors.dark.dark3,
							),
						},
					]}>
					{icon ? <View style={styles.iconContainer}>{icon}</View> : null}

					<View
						style={{
							gap: 16 * refHeightCalc,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Text
							style={{
								...getTypographyStyles(theme).headingH4Bold,
								textAlign: 'center',
							}}>
							{title}
						</Text>
						<Text
							style={{
								...getTypographyStyles(theme).bodyLargeRegular,
								textAlign: 'center',
							}}>
							{subTitle}
						</Text>
					</View>

					{buttonLabel ? (
						<Button
							title={buttonLabel}
							onPress={onButtonPress}
							buttonStyles={{ width: '100%' }}
						/>
					) : null}

					{additionalButtons}
				</View>
			</View>
		</Modal>
	)
}

export default CustomModal

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: colors.others.overlay,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		borderRadius: 24 * refWidthCalc,
		paddingHorizontal: 32 * refWidthCalc,
		paddingVertical: 32 * refHeightCalc,
		gap: 32 * refHeightCalc,
		width: windowWidth * 0.8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})
