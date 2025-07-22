/* Imports */
import React from 'react'
import {
	StyleSheet,
	View,
	Animated,
	Text,
	TouchableOpacity,
	FlatList,
	ImageSourcePropType,
	Image,
	ViewStyle,
} from 'react-native'
import { refWidthCalc, refHeightCalc } from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'
import ScalePress from '../Buttons/ScalePress'
import { useTheme } from '../../hooks/useTheme'
import colors from '../../static/colors'
import { getThemeColor } from '../../utils/helpers'
import Icon from 'react-native-vector-icons/Ionicons'

/* Relative Imports */

/* Local Imports */

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsProductItemCard {
	title?: string
	imageUrl: string | ImageSourcePropType
	onPress?: () => void
	weight?: string
	rating?: number
	ratingCount?: number
	price?: string | number
	customStyles?: any
	showWishlistAddButton?: boolean
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the HorizontalScrollSectionCard.
 *
 * @component
 */
const ProductItemCard: React.FC<PropsProductItemCard> = ({
	title,
	imageUrl,
	onPress,
	weight,
	rating,
	ratingCount,
	price,
	customStyles,
	showWishlistAddButton,
}) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Output */
	return (
		<ScalePress onPress={onPress}>
			<View
				style={[
					styles.cardContainer,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark2,
						),
					},
					customStyles?.cardContainer,
				]}>
				{/* Wishlist icon */}
				{showWishlistAddButton ? (
					<TouchableOpacity
						style={styles.wishlistIcon}
						onPress={() => console.log('Wishlist clicked')}>
						<Icon
							name="heart-outline"
							size={20 * refWidthCalc}
							color={colors.grey[500]}
						/>
					</TouchableOpacity>
				) : null}

				{/* Image */}
				<View
					style={[
						styles.imageContainer,
						{
							backgroundColor: getThemeColor(
								theme,
								colors.grey[200],
								colors.dark.dark1,
							),
						},
						customStyles?.imageContainer,
					]}>
					<Image
						source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
						style={[styles.image, customStyles?.image]}
						resizeMode="contain"
					/>

					{/* Weight */}
					{weight ? (
						<View
							style={[
								styles.weightContainer,
								{
									backgroundColor: getThemeColor(
										theme,
										colors.grey[200],
										colors.dark.dark1,
									),
								},
								customStyles?.weightContainer,
							]}>
							<Text
								style={{
									...getTypographyStyles(theme).bodyXsmallBold,
									color: getThemeColor(
										theme,
										colors.grey[700],
										colors.grey[100],
									),
									...customStyles?.weight,
								}}>
								{weight}
							</Text>
						</View>
					) : null}

					{/* Title */}
					{title ? (
						<Text
							numberOfLines={3}
							style={{
								...getTypographyStyles(theme).bodyMediumBold,
								...customStyles?.title,
							}}>
							{title}
						</Text>
					) : null}

					{/* Rating */}
					{rating ? (
						<View
							style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
							<Icon
								name="star"
								size={14 * refWidthCalc}
								color={colors.secondary[500]}
							/>
							<Text
								style={{
									...getTypographyStyles(theme).bodySmallMedium,
									color: getThemeColor(
										theme,
										colors.grey[700],
										colors.grey[300],
									),
								}}>
								{rating}
							</Text>
							{ratingCount ? (
								<Text
									style={{
										...getTypographyStyles(theme).bodySmallMedium,
										color: getThemeColor(
											theme,
											colors.grey[500],
											colors.grey[400],
										),
									}}>
									({ratingCount})
								</Text>
							) : null}
						</View>
					) : null}

					{/* Price */}
					{price ? (
						<Text
							style={{
								...getTypographyStyles(theme).headingH6Bold,
								color: colors.primary[500],
							}}>
							₹50
						</Text>
					) : null}
				</View>

				{/* Add Button */}
				{showWishlistAddButton ? (
					<TouchableOpacity
						style={[
							styles.addButtonContainer,
							{
								backgroundColor: getThemeColor(
									theme,
									colors.grey[200],
									colors.dark.dark1,
								),
								borderColor: colors.primary[500],
								borderWidth: 1,
							},
						]}
						onPress={() => console.log('Add pressed')}>
						<Text
							style={{
								...getTypographyStyles(theme).bodySmallBold,
							}}>
							ADD
						</Text>
					</TouchableOpacity>
				) : null}
			</View>
		</ScalePress>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: 123 * refWidthCalc,
		height: 290 * refHeightCalc,
		paddingHorizontal: 6 * refWidthCalc,
		paddingVertical: 6 * refHeightCalc,
		gap: 6 * refHeightCalc,
		borderRadius: 16 * refWidthCalc,
		boxShadow: '0px 4px 60px 0px rgba(4, 6, 15, 0.05)',
		justifyContent: 'space-between',
	},

	imageContainer: {
		height: 100 * refHeightCalc,
		borderRadius: 16 * refWidthCalc,
		gap: 6 * refHeightCalc,
	},
	image: {
		width: '100%',
		height: '100%',
		// borderRadius: 16 * refWidthCalc,
	},
	weightContainer: {
		alignSelf: 'flex-start',
		paddingHorizontal: 8 * refWidthCalc,
		paddingVertical: 4 * refHeightCalc,
		borderRadius: 6 * refWidthCalc,
	},
	addButtonContainer: {
		borderRadius: 8 * refWidthCalc,
		paddingHorizontal: 8 * refWidthCalc,
		paddingVertical: 10 * refHeightCalc,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wishlistIcon: {
		position: 'absolute',
		top: 6 * refHeightCalc,
		right: 6 * refWidthCalc,
		zIndex: 2,
		padding: 4,
	},
})

export default ProductItemCard
