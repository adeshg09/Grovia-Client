/* Imports */
import React from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Local Imports */
import { AppStackParamList } from '../../models/navigation/AppStackParamList'
import BottomTabsCustomerNavigation from '../BottomTabsNavigation/BottomTabsCustomerNavigation'
import BestDealsViewAll from '../../screens/Home/Customer/ViewAllSections/BestDealsViewAll'
import RecommendedProductsViewAll from '../../screens/Home/Customer/ViewAllSections/RecommendedViewAll'
import SpecialOffersViewAll from '../../screens/Home/Customer/ViewAllSections/SpecialOffersViewAll'

// -------------------------------------------------------------------------------------------------------------------------

const AppCustomerStackNavigator =
	createNativeStackNavigator<AppStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const AppCustomerStackNavigation: React.FC = () => {
	/* Hooks */

	/* Output */
	return (
		<>
			<AppCustomerStackNavigator.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="BottomTabsCustomerNavigation">
				<AppCustomerStackNavigator.Screen
					name="BottomTabsCustomerNavigation"
					component={BottomTabsCustomerNavigation}
				/>
				<AppCustomerStackNavigator.Screen
					name="SpecialOffersViewAll"
					component={SpecialOffersViewAll}
				/>
				<AppCustomerStackNavigator.Screen
					name="BestDealsViewAll"
					component={BestDealsViewAll}
				/>
				<AppCustomerStackNavigator.Screen
					name="RecommendedProductsViewAll"
					component={RecommendedProductsViewAll}
				/>
			</AppCustomerStackNavigator.Navigator>
		</>
	)
}

export default AppCustomerStackNavigation
