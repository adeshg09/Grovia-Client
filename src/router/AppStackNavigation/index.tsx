/* Imports */
import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'

/* Relative Imports */
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import AppCaptainStackNavigation from './AppCaptainStackNavigation'
import AppCustomerStackNavigation from './AppCustomerStackNavigation'
import CustomBottomSheet, {
	CustomBottomSheetRef,
} from '../../components/BottomSheet'
import {
	requestLocationPermission,
	isLocationPermissionGranted,
	setAndSaveCurrentLocation,
} from '../../utils/location'
import { SvgIcon } from '../../assets'
import colors from '../../static/colors'
import { refWidthCalc, refHeightCalc } from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'
import { useTheme } from '../../hooks/useTheme'
import Button from '../../components/Buttons/Button'
import FullScreenLoader from '../../components/Loader/FullScreenLoader'

// -----------------------------------------------------------------------------

const AppStackNavigation: React.FC = () => {
	/* Hooks */
	const dispatch = useAppDispatch()

	const { theme } = useTheme()
	const user = useAppSelector(
		state => state.auth?.user as { role?: string } | null,
	)
	const bottomSheetRef = useRef<CustomBottomSheetRef>(null)

	/* States */
	const [isLoading, setIsLoading] = useState(false)
	const [isAppReady, setIsAppReady] = useState(false)

	/* Functions */
	const handleContinuePress = async () => {
		setIsLoading(true)

		const granted = await requestLocationPermission()
		if (!granted) {
			setIsLoading(false)
			return
		}

		const success = await setAndSaveCurrentLocation(dispatch, {
			clearSelected: true,
			logPrefix: 'Permission flow',
		})

		if (success) {
			setIsAppReady(true)
			bottomSheetRef.current?.close()
		}

		setIsLoading(false)
	}

	const checkLocationAndShowSheet = async () => {
		const isGranted = await isLocationPermissionGranted()

		if (!isGranted) {
			setTimeout(() => {
				bottomSheetRef.current?.expand()
			}, 300)
		} else {
			const success = await setAndSaveCurrentLocation(dispatch, {
				clearSelected: true,
				logPrefix: 'Initial load',
			})
			if (success) {
				setIsAppReady(success)
			}
		}
	}

	const renderBottomSheetContent = () => (
		<>
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
				<Text style={getTypographyStyles(theme).headingH4Bold}>
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
		</>
	)

	/* Side Effects */
	// useEffect(() => {
	// 	const backAction = () => true
	// 	const backHandler = BackHandler.addEventListener(
	// 		'hardwareBackPress',
	// 		backAction,
	// 	)
	// 	return () => backHandler.remove()
	// }, [])

	useEffect(() => {
		checkLocationAndShowSheet()
	}, [])

	/* Output */
	return (
		<>
			{isAppReady ? (
				user?.role === 'customer' ? (
					<AppCustomerStackNavigation />
				) : (
					<AppCaptainStackNavigation />
				)
			) : (
				<>
					<FullScreenLoader sourceKey="global" />
					<CustomBottomSheet
						ref={bottomSheetRef}
						snapPoints={['45%']}
						enablePanDownToClose={false}
						enableHandlePanningGesture={false}
						enableContentPanningGesture={false}
						backdropPressBehavior="none">
						{renderBottomSheetContent()}
					</CustomBottomSheet>
				</>
			)}
		</>
	)
}

export default AppStackNavigation
