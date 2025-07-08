/* Imports */
import React, { useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, BackHandler } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import { AppStackParamList } from '../../../models/navigation/AppStackParamList'
import Wrapper from '../../../components/Wrapper'
import { useTheme } from '../../../hooks/useTheme'
import { getTypographyStyles } from '../../../static/gstyles'
import colors from '../../../static/colors'
import { getThemeColor } from '../../../utils/helpers'
import { styles } from './index.styles'
import CustomBottomSheet, {
	CustomBottomSheetRef,
} from '../../../components/BottomSheet'
import {
	requestLocationPermission,
	getCurrentLocation,
	isLocationPermissionGranted,
	getAddressFromCoords,
} from '../../../utils/location'
import { SvgIcon } from '../../../assets'
import { refWidthCalc, refHeightCalc } from '../../../static/dimensions'
import Button from '../../../components/Buttons/Button'

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
const CustomerHome: React.FC<PropsCustomerHome> = ({ navigation }) => {
	/* Hooks */
	const { theme } = useTheme()
	const bottomSheetRef = useRef<CustomBottomSheetRef>(null)

	/* States */
	const [isLoading, setIsLoading] = React.useState(false)

	/* Functions */
	const handleContinuePress = async () => {
		setIsLoading(true)
		const granted = await requestLocationPermission()
		if (!granted) {
			setIsLoading(false)
			return
		}

		try {
			const position = await getCurrentLocation()
			const { latitude, longitude } = position.coords
			console.log('Location enabled:', position)
			const address = await getAddressFromCoords(latitude, longitude)
			console.log('Address:', address)
			bottomSheetRef.current?.close()
		} catch (err) {
			console.log('Device-level location OFF:', err)
		}

		setIsLoading(false)
	}

	/* Side-Effects */
	useEffect(() => {
		const backAction = () => true
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		)
		return () => backHandler.remove()
	}, [])

	useEffect(() => {
		const checkLocationAndShowSheet = async () => {
			const isGranted = await isLocationPermissionGranted()

			if (!isGranted) {
				setTimeout(() => {
					if (bottomSheetRef.current) {
						bottomSheetRef.current.expand()
					}
				}, 300)
			}
		}

		checkLocationAndShowSheet()
	}, [])

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
					Welcome to Grovia App
				</Text>
			</View>

			{/* Bottom Sheet */}
			<CustomBottomSheet
				ref={bottomSheetRef}
				snapPoints={['45%']}
				enablePanDownToClose={false}
				enableHandlePanningGesture={false}
				enableContentPanningGesture={false}
				backdropPressBehavior="none">
				<SvgIcon.LocationPermission
					width={140 * refWidthCalc}
					height={140 * refHeightCalc}
				/>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						gap: 8 * refHeightCalc,
					}}>
					<Text
						style={{
							...getTypographyStyles(theme).headingH4Bold,
						}}>
						Location permission is off
					</Text>
					<Text
						style={{
							...getTypographyStyles(theme).bodyLargeMedium,
							color: colors.grey[600],
							textAlign: 'center',
						}}>
						Please enable location permission for better delivery experience
					</Text>
				</View>

				<Button
					title="Continue"
					onPress={handleContinuePress}
					buttonStyles={{ width: '100%' }}
					loading={isLoading}
					disabled={isLoading}
				/>
			</CustomBottomSheet>
		</Wrapper>
	)
}

export default CustomerHome
