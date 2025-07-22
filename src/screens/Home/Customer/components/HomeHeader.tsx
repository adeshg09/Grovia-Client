/* Imports */
import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

/* Relative Imports */

/* Local Imports */
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { getTypographyStyles } from '../../../../static/gstyles'
import { useTheme } from '../../../../hooks/useTheme'
import { SvgIcon } from '../../../../assets'
import colors from '../../../../static/colors'
import { getThemeColor } from '../../../../utils/helpers'
import { useAppSelector } from '../../../../hooks/storeHooks'
import { CustomBottomSheetRef } from '../../../../components/BottomSheet'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsHomeHeader {
	showNotice: () => void
	bottomSheetRef: React.RefObject<CustomBottomSheetRef>
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the HomeHeader.
 *
 * @component
 */
const HomeHeader: React.FC<PropsHomeHeader> = ({
	showNotice,
	bottomSheetRef,
}) => {
	/* Hooks */
	const { theme } = useTheme()
	const currentLocation = useAppSelector(
		store => store.customerDeliveryLocation.currentLocation,
	)
	const selectedLocation = useAppSelector(
		store => store.customerDeliveryLocation.selectedLocation,
	)
	const savedAddresses = useAppSelector(
		store => store.customerDeliveryLocation.savedAddresses,
	)

	/* Constants */
	const effectiveLocation =
		selectedLocation?.addressLine ||
		currentLocation?.addressLine ||
		'Use Current Location'

	// const effectiveDeliveryTime =
	// selectedLocation?.deliveryTime ||
	// currentLocation?.deliveryTime ||
	// '10 minutes'
	const effectiveDeliveryTime = '10 minutes'

	/* Functions */

	/* Output */
	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity
					style={{
						gap: 4 * refHeightCalc,
						alignItems: 'flex-start',
						flex: 1,
					}}
					activeOpacity={0.6}
					onPress={() => {
						bottomSheetRef.current?.expand()
					}}>
					<Text
						style={{
							...getTypographyStyles(theme).bodyMediumBold,
							// color: colors.others.white,
						}}>
						Delivery in
					</Text>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							gap: 6 * refWidthCalc,
						}}>
						<Text
							style={{
								...getTypographyStyles(theme).headingH3Bold,
								// color: colors.others.white,
							}}>
							{effectiveDeliveryTime}
						</Text>
						<TouchableOpacity
							style={[
								styles.noticeBtn,
								{
									backgroundColor: getThemeColor(
										theme,
										colors.primary[500],
										colors.secondary[500],
									),
								},
							]}
							onPress={showNotice}>
							<Text
								style={{
									...getTypographyStyles(theme).bodyMediumSemiBold,
									color: getThemeColor(
										theme,
										colors.secondary[500],
										colors.primary[500],
									),
								}}>
								🌧 Rain
							</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 8 * refWidthCalc,
						}}>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={{
								...getTypographyStyles(theme).bodyMediumRegular,
								maxWidth: '80%',
								// color: colors.others.white,
							}}>
							{effectiveLocation}
						</Text>
						<SvgIcon.DropDown
							width={20 * refWidthCalc}
							height={20 * refWidthCalc}
							color={colors.primary[500]}
						/>
					</View>
				</TouchableOpacity>
				<View
					style={{
						flexDirection: 'row',
						gap: 12 * refWidthCalc,
					}}>
					<TouchableOpacity
						style={{
							width: 40 * refWidthCalc,
							height: 40 * refWidthCalc,
							borderRadius: 100 * refWidthCalc,
							backgroundColor: getThemeColor(
								theme,
								colors.grey[200],
								colors.dark.dark2,
							),
							alignItems: 'center',
							justifyContent: 'center',
							borderWidth: 1.5,
							borderColor: getThemeColor(
								theme,
								colors.grey[300],
								colors.dark.dark3,
							),
						}}
						onPress={() => {}}>
						<SvgIcon.Wallet
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
							color={getThemeColor(theme, colors.dark.dark3, colors.grey[500])}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							width: 40 * refWidthCalc,
							height: 40 * refWidthCalc,
							borderRadius: 100 * refWidthCalc,
							backgroundColor: getThemeColor(
								theme,
								colors.grey[200],
								colors.dark.dark2,
							),
							alignItems: 'center',
							justifyContent: 'center',
							borderWidth: 1.5,
							borderColor: getThemeColor(
								theme,
								colors.grey[300],
								colors.dark.dark3,
							),
						}}
						onPress={() => {}}>
						<SvgIcon.User
							width={24 * refWidthCalc}
							height={24 * refWidthCalc}
							color={getThemeColor(theme, colors.dark.dark3, colors.grey[500])}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24 * refWidthCalc,
		paddingTop: 16 * refHeightCalc,
		paddingBottom: 24 * refHeightCalc,
	},
	noticeBtn: {
		borderRadius: 100 * refWidthCalc,
		paddingHorizontal: 8 * refWidthCalc,
		paddingVertical: 3 * refHeightCalc,
		// bottom: -2 * refHeightCalc,
	},
})

export default HomeHeader
