/* Imports */
import React from 'react'
import { StyleSheet, View } from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from 'src/models/navigation/AppStackParamList'
import Wrapper from '../../../../components/Wrapper'
import { productsData } from '../../../../constants/data'
import ProductsListingGridSection from '../components/ProductsListingGridSection'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
type PropsBestDealsViewAll = NativeStackScreenProps<
	AppStackParamList,
	'BestDealsViewAll'
>

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the All Best Deals Listing Screen.
 *
 * @component
 */
const BestDealsViewAll: React.FC<PropsBestDealsViewAll> = ({ navigation }) => {
	/* Constants */
	const headerTitle = 'Best Deals for You'

	/* Hooks */
	const { theme } = useTheme()

	/* Functions */
	const onPressGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack()
		}
	}

	/* Output */
	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
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
				<ProductsListingGridSection
					headerTitle={headerTitle}
					productsData={productsData}
					navigation={navigation}
					onPressGoBack={onPressGoBack}
				/>
			</View>
		</Wrapper>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default BestDealsViewAll
