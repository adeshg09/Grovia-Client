/* Imports */
import React from 'react'
import {
	StyleSheet,
	View,
	Animated,
	Text,
	TouchableOpacity,
	FlatList,
} from 'react-native'

/* Relative Imports */

/* Local Imports */
import Notice from './Notice'
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import { getTypographyStyles } from '../../../../static/gstyles'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsHorizontalScrollSection {
	title: string
	onPressViewAll?: () => void
	data: any[]
	renderItem: ({
		item,
		index,
	}: {
		item: any
		index: number
	}) => React.ReactElement
	contentContainerStyle?: object
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the HorizontalScrollSection.
 *
 * @component
 */
const HorizontalScrollSection: React.FC<PropsHorizontalScrollSection> = ({
	title,
	onPressViewAll,
	data,
	renderItem,
	contentContainerStyle = {},
}) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Output */
	return (
		<View style={[styles.container]}>
			<View style={styles.headerContainer}>
				<Text
					style={{
						...getTypographyStyles(theme).headingH5Bold,
					}}>
					{title}
				</Text>
				{onPressViewAll ? (
					<TouchableOpacity onPress={onPressViewAll}>
						<Text
							style={{
								...getTypographyStyles(theme).bodyLargeBold,
								color: colors.primary[500],
							}}>
							View All
						</Text>
					</TouchableOpacity>
				) : null}
			</View>
			{data?.length ? (
				<FlatList
					data={data}
					keyExtractor={(item, index) => index.toString()}
					style={{
						marginHorizontal: -24 * refWidthCalc,
					}}
					contentContainerStyle={[
						{
							paddingHorizontal: 24 * refWidthCalc,
						},
						contentContainerStyle,
					]}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={renderItem}
					ItemSeparatorComponent={() => (
						<View style={{ width: 6 * refWidthCalc }} />
					)}
				/>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24 * refWidthCalc,
		gap: 12 * refHeightCalc,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})

export default HorizontalScrollSection
