/* Imports */
import React from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Local Imports */
import { AppStackParamList } from '../../models/navigation/AppStackParamList'
import CaptainHome from '../../screens/Home/Captain'
import BottomTabsNavigation from '../BottomTabsNavigation/BottomTabsNavigation'
import BottomTabsCaptainNavigation from '../BottomTabsNavigation/BottomTabsCaptainNavigation'

// -------------------------------------------------------------------------------------------------------------------------

const AppCaptainStackNavigator = createNativeStackNavigator<AppStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const AppCaptainStackNavigation: React.FC = () => {
	console.log('📲 AppCaptainStackNavigation mounted')

	/* Output */
	return (
		<AppCaptainStackNavigator.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="BottomTabsCaptainNavigation">
			<AppCaptainStackNavigator.Screen
				name="BottomTabsCaptainNavigation"
				component={BottomTabsCaptainNavigation}
			/>
			<AppCaptainStackNavigator.Screen
				name="CaptainHome"
				component={CaptainHome}
			/>
		</AppCaptainStackNavigator.Navigator>
	)
}

export default AppCaptainStackNavigation
