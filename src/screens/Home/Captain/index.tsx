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

type PropsCaptainHome = NativeStackScreenProps<AppStackParamList, 'CaptainHome'>
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the CaptainHome Screen.
 *
 * @component
 */
const CaptainHome: React.FC<PropsCaptainHome> = ({ navigation, route }) => {
	/* Constants */

	/* Hooks */
	const { theme, toggleTheme } = useTheme()
	console.log('theme', theme)
	const dispatch = useAppDispatch()

	console.log('🟢 CaptainHome mounted')

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
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark1,
						),
					},
				]}>
				<Text
					style={{
						...getTypographyStyles(theme).headingH5Bold,
						color: colors.others.red,
					}}>
					Welcome to Grovia App Captain
				</Text>
			</View>
		</Wrapper>
	)
}

export default CaptainHome
