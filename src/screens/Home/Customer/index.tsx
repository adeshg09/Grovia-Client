/* Imports */
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../../models/navigation/AppStackParamList'
import Wrapper from '../../../components/Wrapper'
import { useTheme } from '../../../hooks/useTheme'
import { styles } from './index.styles'
import colors from '../../../static/colors'
import { getTypographyStyles } from '../../../static/gstyles'
import { changeNavigationColor, getThemeColor } from '../../../utils/helpers'
import { removeItem, localStoreKeys } from '../../../store/local/asyncStore'
import { authSliceActions } from '../../../store/authSlice'
import { useAppDispatch } from '../../../hooks/storeHooks'

/* Local Imports */

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsCustomerHome = NativeStackScreenProps<
	AppStackParamList,
	'CustomerHome'
>
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the CustomerHome Screen.
 *
 * @component
 */
const CustomerHome: React.FC<PropsCustomerHome> = ({ navigation, route }) => {
	/* Constants */

	/* Hooks */
	const { theme, toggleTheme } = useTheme()
	console.log('theme', theme)
	const dispatch = useAppDispatch()

	/* States */

	/* Functions */

	/* Side-Effects */

	/* Output */
	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}>
			<View
				style={[
					styles.container,
					theme === 'dark'
						? { backgroundColor: colors.dark.dark1 }
						: { backgroundColor: colors.others.white },
				]}>
				<Text
					onPress={toggleTheme}
					style={{
						...getTypographyStyles(theme).headingH5Bold,
						color: colors.others.red,
					}}>
					Welcome to Grovia App
				</Text>
				<TouchableOpacity
					onPress={toggleTheme}
					style={{
						backgroundColor: colors.primary[500],
					}}>
					<Text>Toggle</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await removeItem(localStoreKeys.USER_DATA)
						await removeItem(localStoreKeys.USER_ACCESS_TOKEN)
						await removeItem(localStoreKeys.USER_REFRESH_TOKEN)
						await removeItem(localStoreKeys.LOGGED_IN)
						await removeItem(localStoreKeys.IS_REGISTED)
						dispatch(authSliceActions?.logout())
					}}
					style={{
						backgroundColor: colors.primary[500],
					}}>
					<Text>Logout</Text>
				</TouchableOpacity>
			</View>
		</Wrapper>
	)
}

export default CustomerHome
