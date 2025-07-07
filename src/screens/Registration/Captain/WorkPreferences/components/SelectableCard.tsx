import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SvgIcon } from '../../../../../assets'
import { useTheme } from '../../../../../hooks/useTheme'
import colors from '../../../../../static/colors'
import { refWidthCalc, refHeightCalc } from '../../../../../static/dimensions'
import { getTypographyStyles } from '../../../../../static/gstyles'
import { getThemeColor } from '../../../../../utils/helpers'

type Props = {
	label: string
	icon?: React.ReactNode
	selected: boolean
	onPress: () => void
}

const SelectableCard: React.FC<Props> = ({
	label,
	icon,
	selected,
	onPress,
}) => {
	const { theme } = useTheme()

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			style={[
				styles.cardContainer,
				{
					backgroundColor: getThemeColor(
						theme,
						colors.grey[200],
						colors.dark.dark2,
					),
				},
			]}>
			<View style={styles.row}>
				<View style={styles.innerRow}>
					{icon && <View>{icon}</View>}
					<Text style={getTypographyStyles(theme).headingH5Bold}>{label}</Text>
				</View>
				<View
					style={{
						borderRadius: 100,
						padding: 6,
						backgroundColor: getThemeColor(
							theme,
							colors.grey[100],
							colors.dark.dark1,
						),
					}}>
					{selected ? (
						<SvgIcon.Checked
							width={24 * refWidthCalc}
							height={24 * refHeightCalc}
							color={colors.primary[500]}
						/>
					) : (
						<SvgIcon.UnChecked
							width={24 * refWidthCalc}
							height={24 * refHeightCalc}
							color={colors.primary[500]}
						/>
					)}
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 24 * refHeightCalc,
		paddingHorizontal: 24 * refWidthCalc,
		borderRadius: 12 * refWidthCalc,
		marginBottom: 16 * refHeightCalc,
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	innerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16 * refWidthCalc,
	},
})

export default SelectableCard
