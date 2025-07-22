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
import Icon from 'react-native-vector-icons/Ionicons'
import RollingBar from 'react-native-rolling-bar'

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { getTypographyStyles } from '../../../../static/gstyles'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsSearchBar {
	useRollingBar?: boolean
	rollingTexts?: string[]
	placeholder?: string
	onSearchPress?: () => void
	containerStyle?: ViewStyle
	textStyle?: TextStyle
	disabled?: boolean
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the SearchBar.
 *
 * @component
 */
const SearchBar: React.FC<PropsSearchBar> = ({
	useRollingBar = true,
	rollingTexts = ['Search "milk"', 'Search "bread"', 'Search for eggs'],
	placeholder = 'Search anything...',
	onSearchPress,
	containerStyle,
	textStyle,
	disabled = false,
}) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Output */
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: getThemeColor(
						theme,
						colors.grey[200],
						colors.dark.dark2,
					),
					borderColor: getThemeColor(
						theme,
						colors.grey[200],
						colors.dark.dark2,
					),
				},
				containerStyle,
			]}
			activeOpacity={0.8}
			onPress={onSearchPress}
			disabled={disabled}>
			<Icon name="search" color={colors.grey[500]} size={20 * refWidthCalc} />

			{useRollingBar ? (
				<RollingBar
					interval={3000}
					defaultStyle={false}
					customStyle={[styles.textContainer]}>
					{rollingTexts.map((text, index) => (
						<Text
							key={index}
							style={[
								{
									...getTypographyStyles(theme).bodyLargeSemiBold,
									textAlign: 'center',
								},
								textStyle,
							]}>
							{text}
						</Text>
					))}
				</RollingBar>
			) : (
				<View style={styles.textContainer}>
					<Text
						style={[
							{
								...getTypographyStyles(theme).bodyLargeSemiBold,
								textAlign: 'center',
							},
							textStyle,
						]}>
						{placeholder}
					</Text>
				</View>
			)}

			{useRollingBar && (
				<>
					<View
						style={[styles.divider, { backgroundColor: colors.grey[300] }]}
					/>
					<TouchableOpacity onPress={() => {}} disabled={disabled}>
						<Icon
							name="mic"
							color={colors.grey[500]}
							size={20 * refWidthCalc}
						/>
					</TouchableOpacity>
				</>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-between',
		borderRadius: 16 * refWidthCalc,
		// marginTop: 15 * refHeightCalc,
		overflow: 'hidden',
		marginHorizontal: 24 * refHeightCalc,
		paddingHorizontal: 10 * refWidthCalc,
	},
	divider: {
		width: 1 * refWidthCalc,
		height: 24 * refHeightCalc,
		marginHorizontal: 10 * refWidthCalc,
	},
	textContainer: {
		width: '110%',
		// paddingLeft: 10,
		height: 50 * refHeightCalc,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default SearchBar
