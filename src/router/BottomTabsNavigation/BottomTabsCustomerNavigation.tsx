/* Imports */
import React, { useEffect } from 'react'
import { Platform, Text, View } from 'react-native'

/* Relative Imports */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { hideNavigationBar } from 'react-native-navigation-bar-color'

/* Local Imports */
import colors from '../../static/colors'
import { fontFamily } from '../../static/fonts'
import { SvgIcon } from '../../assets'
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import { useTheme } from '../../hooks/useTheme'
import { getThemeColor } from '../../utils/helpers'
import CustomerHome from '../../screens/Home/Customer'
import { getTypographyStyles } from '../../static/gstyles'
import Categories from '../../screens/Categories'

// -----------------------------------------------------------------------------

const BottomTab = createBottomTabNavigator()

const BottomTabsCustomerNavigation = () => {
	const { theme } = useTheme()

	console.log('📲 BottomTabsCustomerNavigation mounted')

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
					paddingVertical: 6 * refHeightCalc,
					marginVertical: -1 * refHeightCalc,
					alignItems: 'center',
					justifyContent: 'center',
				},
				tabBarStyle: {
					...(Platform.OS === 'ios'
						? { minHeight: 90 * refHeightCalc }
						: { minHeight: 70 * refHeightCalc }),
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
								...getTypographyStyles(theme).bodyXsmallBold,
								fontFamily: focused ? fontFamily.bold : fontFamily.regular,
								color: focused ? colors.primary[500] : colors.grey[500],
								// textDecorationLine: focused ? 'underline' : 'none',
							}}>
							{route.name}
						</Text>
					</View>
				),
			})}>
			<BottomTab.Screen
				name="Home"
				component={CustomerHome}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<SvgIcon.Home
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
				component={Categories}
				options={{
					tabBarIcon: ({ focused }) => (
						<SvgIcon.Categories
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="QuickList"
				component={CustomerHome}
				options={{
					tabBarIcon: ({ focused }) => (
						<SvgIcon.QuickList
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
				component={CustomerHome}
				options={{
					tabBarIcon: ({ focused }) => (
						<SvgIcon.InstaDish
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
				component={CustomerHome}
				options={{
					tabBarIcon: ({ focused }) => (
						<SvgIcon.Cart
							isFilled={focused}
							color={focused ? colors.primary[500] : colors.grey[500]}
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
						/>
					),
				}}
			/>
		</BottomTab.Navigator>
	)
}

export default BottomTabsCustomerNavigation
