/* Imports */
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

/* Relative Imports */

/* Local Imports */
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { getTypographyStyles } from '../../../../static/gstyles'
import { useTheme } from '../../../../hooks/useTheme'
import colors from '../../../../static/colors'
import HorizontalScrollSection from './HorizontalScrollSection'
import ImageCarousal from '../../../../components/Carousal/ImageCarousal'
import {
	homebannerCarousalData,
	mainCategoriesData,
	productsData,
} from '../../../../constants/data'
import ProductItemCard from '../../../../components/Card/ProductItemCard'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsHomeContent {
	navigation: any
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the HomeContent.
 *
 * @component
 */
const HomeContent: React.FC<PropsHomeContent> = ({ navigation }) => {
	/* Constants */
	const onPressViewAll = {
		specialOffersViewAll: () => navigation.navigate('SpecialOffersViewAll'),
		shopByCategoryViewAll: () => navigation.navigate('Categories'),
		bestDealsForYouViewAll: () => navigation.navigate('BestDealsViewAll'),
		recommendedForYouViewAll: () =>
			navigation.navigate('RecommendedProductsViewAll'),
	}

	/* Hooks */
	const { theme } = useTheme()

	/* Functions */
	const shopByCategoryRenderItem = ({ item }: { item: any }) => {
		return (
			<ProductItemCard
				title={item.title}
				imageUrl={item.img}
				onPress={() => console.log('Pressed:', item.title)}
				customStyles={{
					cardContainer: {
						height: 160 * refHeightCalc,
					},
					title: {
						textAlign: 'center',
					},
				}}
			/>
		)
	}

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

	const recommendedForYouRenderItem = ({ item }: { item: any }) => {
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
		<View style={styles.container}>
			<View style={styles.carousalContainer}>
				<View style={styles.carousalheaderContainer}>
					<Text
						style={{
							...getTypographyStyles(theme).headingH5Bold,
						}}>
						Special Offers
					</Text>
					<TouchableOpacity onPress={onPressViewAll.specialOffersViewAll}>
						<Text
							style={{
								...getTypographyStyles(theme).bodyLargeBold,
								color: colors.primary[500],
							}}>
							View All
						</Text>
					</TouchableOpacity>
				</View>
				<ImageCarousal carousalData={homebannerCarousalData} />
			</View>

			<View style={styles.productsListingContainer}>
				<HorizontalScrollSection
					title="Shop By Category"
					onPressViewAll={onPressViewAll.shopByCategoryViewAll}
					data={mainCategoriesData}
					renderItem={shopByCategoryRenderItem}
				/>

				<HorizontalScrollSection
					title="Best Deals For You"
					onPressViewAll={onPressViewAll.bestDealsForYouViewAll}
					data={productsData}
					renderItem={bestDealsForYouRenderItem}
				/>

				<HorizontalScrollSection
					title="Recommended For You"
					onPressViewAll={onPressViewAll.recommendedForYouViewAll}
					data={productsData}
					renderItem={recommendedForYouRenderItem}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		gap: 12 * refHeightCalc,
		paddingBottom: 24 * refHeightCalc,
	},
	carousalContainer: {
		paddingHorizontal: 24 * refWidthCalc,
	},
	carousalheaderContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	productsListingContainer: {
		gap: 24 * refHeightCalc,
	},
})

export default HomeContent
