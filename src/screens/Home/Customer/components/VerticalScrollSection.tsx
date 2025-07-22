/* Imports */
import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
} from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import colors from '../../../../static/colors'
import { getTypographyStyles } from '../../../../static/gstyles'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsVerticalScrollSection {
	title?: string
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
 * Component to create the VerticalScrollSection.
 *
 * @component
 */
const VerticalScrollSection: React.FC<PropsVerticalScrollSection> = ({
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
			{title ? (
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
			) : null}

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
							paddingVertical: 16 * refHeightCalc,
							gap: 16 * refHeightCalc,
						},
						contentContainerStyle,
					]}
					showsVerticalScrollIndicator={false}
					renderItem={renderItem}
					// ItemSeparatorComponent={() => (
					// 	<View style={{ width: 6 * refWidthCalc }} />
					// )}
					numColumns={3}
					columnWrapperStyle={{
						justifyContent: 'space-between',
					}}
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

export default VerticalScrollSection
