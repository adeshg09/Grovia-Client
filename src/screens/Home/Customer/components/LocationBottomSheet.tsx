/* Imports */
import React from 'react'
import {
	StyleSheet,
	View,
	Animated,
	Text,
	TouchableOpacity,
} from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import CustomBottomSheet, {
	CustomBottomSheetRef,
} from '../../../../components/BottomSheet'
import { SvgIcon } from '../../../../assets'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { getTypographyStyles } from '../../../../static/gstyles'
import { setAndSaveCurrentLocation } from '../../../../utils/location'
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import SearchBar from './SearchBar'
// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsLocationBottomSheet {
	bottomSheetRef: React.RefObject<CustomBottomSheetRef>
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Location BottomSheet.
 *
 * @component
 */
const LocationBottomSheet: React.FC<PropsLocationBottomSheet> = ({
	bottomSheetRef,
}) => {
	/* Hooks */
	const dispatch = useAppDispatch()
	const { theme } = useTheme()
	const currentLocation = useAppSelector(
		store => store.customerDeliveryLocation.currentLocation,
	)

	/* Functions */
	const handleUseCurrentLocation = async () => {
		const success = await setAndSaveCurrentLocation(dispatch, {
			clearSelected: true,
			logPrefix: 'Initial load',
		})
		if (success) {
			bottomSheetRef.current?.close()
		}
	}

	/* Output */
	return (
		<CustomBottomSheet ref={bottomSheetRef} snapPoints={['45%']}>
			<View
				style={{
					alignItems: 'center',
					// justifyContent: 'center',
					gap: 8 * refHeightCalc,
				}}>
				<Text style={getTypographyStyles(theme).headingH5Bold}>
					Select Delivery Location
				</Text>
				<SearchBar
					useRollingBar={false}
					placeholder="Search for area, street name..."
					containerStyle={{
						backgroundColor: getThemeColor(
							theme,
							colors.grey[200],
							colors.dark.dark1,
						),
						borderColor: getThemeColor(
							theme,
							colors.grey[200],
							colors.dark.dark1,
						),
					}}
					textStyle={{ color: colors.grey[600] }}
				/>

				<TouchableOpacity
					style={{
						paddingHorizontal: 16 * refWidthCalc,
						paddingVertical: 12 * refHeightCalc,
						backgroundColor: getThemeColor(
							theme,
							colors.grey[200],
							colors.dark.dark1,
						),
						borderRadius: 16 * refHeightCalc,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 16 * refWidthCalc,
					}}
					activeOpacity={0.8}
					onPress={handleUseCurrentLocation}>
					<SvgIcon.Location
						width={20 * refWidthCalc}
						height={20 * refHeightCalc}
						color={colors.primary[500]}
					/>
					<View
						style={{
							flex: 1,
							gap: 4 * refHeightCalc,
						}}>
						<Text
							style={{
								...getTypographyStyles(theme).bodyLargeBold,
								color: colors.primary[500],
							}}>
							Use current location
						</Text>
						<Text
							numberOfLines={3}
							style={{
								...getTypographyStyles(theme).bodySmallMedium,
								color: colors.grey[600],
								lineHeight: 15 * refHeightCalc,
							}}>
							{currentLocation?.addressLine}
						</Text>
					</View>
					<SvgIcon.ArrowRight
						width={20 * refWidthCalc}
						height={20 * refHeightCalc}
						color={colors.grey[600]}
					/>
				</TouchableOpacity>

				<Text
					style={{
						...getTypographyStyles(theme).bodyLargeBold,
						color: colors.grey[400],
					}}>
					Your saved addresses
				</Text>
			</View>
		</CustomBottomSheet>
	)
}

const styles = StyleSheet.create({})

export default LocationBottomSheet
