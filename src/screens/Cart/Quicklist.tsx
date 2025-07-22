/* Imports */
import React, { useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, BackHandler } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import { AppStackParamList } from '../../models/navigation/AppStackParamList'
import Wrapper from '../../components/Wrapper'
import { useTheme } from '../../hooks/useTheme'
import { getTypographyStyles } from '../../static/gstyles'
import colors from '../../static/colors'
import { getThemeColor } from '../../utils/helpers'
import { styles } from '../Home/Customer/index.styles'
import CustomBottomSheet, {
	CustomBottomSheetRef,
} from '../../components/BottomSheet'
import {
	requestLocationPermission,
	getCurrentLocation,
	isLocationPermissionGranted,
	getAddressFromCoords,
} from '../../utils/location'
import { SvgIcon } from '../../assets'
import { refWidthCalc, refHeightCalc } from '../../static/dimensions'
import Button from '../../components/Buttons/Button'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
type PropsQuicklist = NativeStackScreenProps<AppStackParamList, 'Quicklist'>

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Quicklist Screen.
 *
 * @component
 */
const Quicklist: React.FC<PropsQuicklist> = ({ navigation }) => {
	/* Hooks */
	const { theme } = useTheme()

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
					Welcome to Grovia App Customer
				</Text>
			</View>
		</Wrapper>
	)
}

export default Quicklist
