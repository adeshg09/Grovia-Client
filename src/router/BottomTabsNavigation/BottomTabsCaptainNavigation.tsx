/* Imports */
import React, { useEffect } from 'react'
import { Platform, Text, View } from 'react-native'

/* Relative Imports */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { hideNavigationBar } from 'react-native-navigation-bar-color'

/* Local Imports */
import colors from '../../static/colors'
import { fontFamily, scaleText } from '../../static/fonts'
import { SvgIcon } from '../../assets'
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import CaptainHome from '../../screens/Home/Captain'
import { getThemeColor } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'

// -----------------------------------------------------------------------------

const BottomTab = createBottomTabNavigator()

const BottomTabsCaptainNavigation = () => {
	const { theme } = useTheme()

	console.log('📲 BottomTabsCaptainNavigation mounted')

	/* Side-Effects */
	useEffect(() => {
		hideNavigationBar()
	}, [])

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: colors.primary[500],
				tabBarInactiveTintColor: colors.grey[500],
				tabBarItemStyle: {
					backgroundColor: getThemeColor(
						theme,
						colors.others.white,
						colors.dark.dark1,
					),
					paddingVertical: 1 * refHeightCalc,
				},
				tabBarStyle: {
					...(Platform.OS === 'ios'
						? { minHeight: 90 * refHeightCalc }
						: { minHeight: 67 * refHeightCalc }),
				},
				tabBarLabel: ({ focused, color }) => (
					<View
						style={{
							borderBottomColor: focused
								? colors.primary[500]
								: colors.grey[500],
						}}>
						<Text
							style={{
								fontFamily: focused ? fontFamily.semiBold : fontFamily.regular,
								fontSize: scaleText(10),
								letterSpacing: 0,
								color: focused ? colors.primary[500] : colors.grey[500],
								textDecorationLine: focused ? 'underline' : 'none',
							}}>
							{route.name}
						</Text>
					</View>
				),
				// tabBarBackground: () => (
				// 	<BlurView
				// 		style={StyleSheet.absoluteFill}
				// 		blurType="dark"
				// 		blurAmount={10}
				// 		reducedTransparencyFallbackColor="#000"
				// 	/>
				// ),
			})}>
			<BottomTab.Screen
				name="Home"
				component={CaptainHome}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<SvgIcon.Google
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="Categories"
				component={CaptainHome}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<SvgIcon.Google
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/>
			{/* <BottomTab.Screen
				name="QuickList"
				component={CaptainHome}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<SvgIcon.Google
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="InstaDish"
				component={CaptainHome}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<SvgIcon.Google
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="Cart"
				component={CaptainHome}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<SvgIcon.Google
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/> */}
		</BottomTab.Navigator>
	)
}

export default BottomTabsCaptainNavigation
