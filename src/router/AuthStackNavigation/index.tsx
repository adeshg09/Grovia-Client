/* Imports */
import React from 'react'

/* Relative Imports */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Local Imports */
import { AuthStackParamList } from '../../models/navigation/AuthStackParamList'
import AuthWelcome from '../../screens/Auth/Welcome'
import EnterNumber from '../../screens/Auth/EnterNumber'
import EnterOtp from '../../screens/Auth/EnterOtp'

// -------------------------------------------------------------------------------------------------------------------------

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>()

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const AuthStackNavigation: React.FC = () => {
	/* Output */
	return (
		<AuthStackNavigator.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="AuthWelcome">
			{/* <AuthStackNavigator.Screen
				options={{ headerShown: false }}
				name="Onboarding"
				component={Onboarding}
			/> */}
			<AuthStackNavigator.Screen
				options={{ headerShown: false }}
				name="AuthWelcome"
				component={AuthWelcome}
			/>
			<AuthStackNavigator.Screen
				options={{ headerShown: false }}
				name="EnterNumber"
				component={EnterNumber}
			/>
			<AuthStackNavigator.Screen
				options={{ headerShown: false }}
				name="EnterOtp"
				component={EnterOtp}
			/>
		</AuthStackNavigator.Navigator>
	)
}

export default AuthStackNavigation
