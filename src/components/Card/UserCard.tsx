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
import Avatar from '../Avatar/Avatar'
import colors from 'src/static/colors'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsUserCard = {
	profileUrl: string
	rightIconElement?: React.ReactNode
	fullName?: string
	userName?: string
	containerStyle?: ViewStyle
	titleStyle?: TextStyle
	onPressLeft?: () => void
	onPressRight?: () => void
}
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the UserCard Screen.
 *
 * @component
 */
const UserCard: React.FC<PropsUserCard> = ({
	profileUrl,
	rightIconElement,
	fullName,
	userName,
	containerStyle,
	titleStyle,
	onPressLeft,
	onPressRight,
}) => {
	/* Constants */

	/* Hooks */
	const { theme } = useTheme()

	/* States */

	/* Functions */

	/* Side-Effects */

	/* Output */
	return (
		<View style={[styles.UserCardContainer, containerStyle]}>
			<View
				style={{
					gap: 20 * refWidthCalc,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<Avatar
					avatarUrl={profileUrl}
					extraStyles={{
						width: 60 * refWidthCalc,
						height: 60 * refWidthCalc,
						borderRadius: 1000 * refWidthCalc,
					}}
				/>
				<View
					style={{
						paddingVertical: 7 * refHeightCalc,
					}}>
					<Text
						style={{
							...getTypographyStyles(theme).headingH6Bold,
							...titleStyle,
						}}>
						{userName}
					</Text>
					<Text
						style={{
							...getTypographyStyles(theme).bodyMediumMedium,
							color: colors.grey[700],
							...titleStyle,
						}}>
						{fullName}
					</Text>
				</View>
			</View>

			{rightIconElement ? rightIconElement : null}
		</View>
	)
}

export default UserCard

/* Styles */
const styles = StyleSheet.create({
	UserCardContainer: {
		gap: 20 * refWidthCalc,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
