/* Imports */
import React from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Local Imports */
import { AppStackParamList } from '../../models/navigation/AppStackParamList'
import CustomerHome from '../../screens/Home/Customer'

// -------------------------------------------------------------------------------------------------------------------------

const AppCustomerStackNavigator =
	createNativeStackNavigator<AppStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const AppCustomerStackNavigation: React.FC = () => {
	/* Output */
	return (
		<AppCustomerStackNavigator.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="CustomerHome">
			<AppCustomerStackNavigator.Screen
				name="CustomerHome"
				component={CustomerHome}
			/>
		</AppCustomerStackNavigator.Navigator>
	)
}

export default AppCustomerStackNavigation
