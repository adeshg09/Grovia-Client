/* Imports */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

/* Relative Imports */

/* Local Imports */
import {
	refWidthCalc,
	refHeightCalc,
	windowWidth,
} from '../../../static/dimensions'
import { getTypographyStyles } from '../../../static/gstyles'
import { useTheme } from '../../../hooks/useTheme'
import ProductItemCard from '../../../components/Card/ProductItemCard'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsCategoriesSectionItem {
	title: string
	data: any[]
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the CategoriesSectionItem.
 *
 * @component
 */
const CategoriesSectionItem: React.FC<PropsCategoriesSectionItem> = ({
	title,
	data,
}) => {
	/* Constants */
	/* Hooks */
	const { theme } = useTheme()

	console.log('data', data)

	/* Output */
	return (
		<View style={[styles.container]}>
			<Text
				style={{
					...getTypographyStyles(theme).headingH5Bold,
				}}>
				{title}
			</Text>

			<View style={styles.bodyContainer}>
				{data?.map((subCategoryItem, index) => (
					<ProductItemCard
						key={index}
						title={subCategoryItem.name}
						imageUrl={subCategoryItem.image}
						onPress={() => console.log('Pressed:', subCategoryItem.title)}
						customStyles={{
							cardContainer: {
								height: 160 * refHeightCalc,
							},
							title: {
								textAlign: 'center',
							},
						}}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 12 * refHeightCalc,
	},
	bodyContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 5 * refWidthCalc,
		alignItems: 'center',
	},
})

export default CategoriesSectionItem
