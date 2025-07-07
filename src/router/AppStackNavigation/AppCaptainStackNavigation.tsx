/* Imports */
import React from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Local Imports */
import { AppStackParamList } from '../../models/navigation/AppStackParamList'
import CaptainHome from '../../screens/Home/Captain'

// -------------------------------------------------------------------------------------------------------------------------

const AppCaptainStackNavigator = createNativeStackNavigator<AppStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const AppCaptainStackNavigation: React.FC = () => {
	/* Output */
	return (
		<AppCaptainStackNavigator.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="CaptainHome">
			<AppCaptainStackNavigator.Screen
				name="CaptainHome"
				component={CaptainHome}
			/>
		</AppCaptainStackNavigator.Navigator>
	)
}

export default AppCaptainStackNavigation
