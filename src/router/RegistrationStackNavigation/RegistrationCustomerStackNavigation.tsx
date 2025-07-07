/* Imports */
import React from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RegistrationStackParamList } from '../../models/navigation/RegistrationStackParamList'
import CreateCustomerProfile from '../../screens/Registration/Customer'

/* Local Imports */

// -------------------------------------------------------------------------------------------------------------------------

const RegistrationCustomerStackNavigator =
	createNativeStackNavigator<RegistrationStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const RegistrationCustomerStackNavigation: React.FC = () => {
	/* Output */
	return (
		<RegistrationCustomerStackNavigator.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="CreateCustomerProfile">
			<RegistrationCustomerStackNavigator.Screen
				name="CreateCustomerProfile"
				component={CreateCustomerProfile}
			/>
		</RegistrationCustomerStackNavigator.Navigator>
	)
}

export default RegistrationCustomerStackNavigation
