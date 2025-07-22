/* Imports */
import React from 'react'
import { StyleSheet, View } from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import Wrapper from '../../../../components/Wrapper'
import Header from '../../../../components/Header/Header'
import { SvgIcon } from '../../../../assets'
import { refWidthCalc, refHeightCalc } from '../../../../static/dimensions'
import ProductItemCard from '../../../../components/Card/ProductItemCard'
import VerticalScrollSection from '../components/VerticalScrollSection'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsProductListingGridSection {
	navigation: any
	headerTitle: string
	productsData: any[]
	onPressGoBack: () => void
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Products Listing Grid Screen.
 *
 * @component
 */
const ProductsListingGridSection: React.FC<PropsProductListingGridSection> = ({
	navigation,
	headerTitle,
	productsData,
	onPressGoBack,
}) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Functions */
	const bestDealsForYouRenderItem = ({ item }: { item: any }) => {
		return (
			<ProductItemCard
				title={item.title}
				imageUrl={item.img}
				onPress={() => console.log('Pressed:', item.title)}
				weight={item.weight}
				rating={item.rating}
				ratingCount={item.ratingCount}
				price={item.price}
				showWishlistAddButton
			/>
		)
	}

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
				},
			]}>
			<Header
				label={headerTitle}
				containerStyle={{
					borderBottomWidth: 1,
					borderBottomColor: getThemeColor(
						theme,
						colors.grey[100],
						colors.dark.dark2,
					),
					paddingHorizontal: 24 * refWidthCalc,
					paddingVertical: 16 * refHeightCalc,
					gap: 12 * refHeightCalc,
				}}
				leftIcon={
					<SvgIcon.ArrowLeft
						width={28 * refWidthCalc}
						height={28 * refHeightCalc}
						color={getThemeColor(theme, colors.grey[400], colors.grey[600])}
					/>
				}
				onPressLeft={onPressGoBack}
				rightIcon={
					<SvgIcon.Search
						width={28 * refWidthCalc}
						height={28 * refHeightCalc}
						color={getThemeColor(theme, colors.grey[400], colors.grey[600])}
					/>
				}
			/>

			<VerticalScrollSection
				data={productsData}
				renderItem={bestDealsForYouRenderItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default ProductsListingGridSection
