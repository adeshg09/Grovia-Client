/* Imports */
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Image,
	ScrollView,
} from 'react-native'

/* Relative Imports */
import CountryPicker, { Country } from 'react-native-country-picker-modal'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
	useTruecaller,
	TRUECALLER_ANDROID_CUSTOMIZATIONS,
} from '@kartikbhalla/react-native-truecaller'

/* Local Imports */
import { AuthStackParamList } from '../../../models/navigation/AuthStackParamList'
import Wrapper from '../../../components/Wrapper'
import colors from '../../../static/colors'
import { getThemeColor } from '../../../utils/helpers'
import { useTheme } from '../../../hooks/useTheme'
import { getTypographyStyles } from '../../../static/gstyles'
import {
	refHeightCalc,
	refWidthCalc,
	windowWidth,
} from '../../../static/dimensions'
import ProductSlider from '../components/ProductSlider'
import { SvgIcon } from '../../../assets'
import {
	EnterNumberFormData,
	EnterNumberFormSchema,
} from '../../../models/viewModels/auth'
import Button from '../../../components/Buttons/Button'
import { fontFamily } from '../../../static/fonts'
import { useSendOtp, useVerifyOtp } from '../../../hooks/auth/useAuth'
import { styles } from './index.styles'
import { envConfig } from '../../../config/envConfig'
import {
	localStoreKeys,
	setItem,
	storeAuthData,
} from '../../../store/local/asyncStore'
import { authSliceActions } from '../../../store/authSlice'
import { useAppDispatch } from '../../../hooks/storeHooks'

// -------------------------------------------------------------------------------------------------------------------------

type PropsEnterNumber = NativeStackScreenProps<
	AuthStackParamList,
	'EnterNumber'
>

// -------------------------------------------------------------------------------------------------------------------------

const EnterNumber: React.FC<PropsEnterNumber> = ({ navigation, route }) => {
	/* Constants */
	const { role } = route.params
	const tagLine =
		role === 'customer' ? 'Freshness Delivered Daily.' : 'Ride, Deliver, Earn.'

	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<EnterNumberFormData>({
		resolver: zodResolver(EnterNumberFormSchema),
		defaultValues: {
			countryCode: '+91',
			phoneNumber: '',
		},
		mode: 'onChange',
	})

	const translateY = useRef(new Animated.Value(0)).current

	const { mutate: sendOtp, isPending } = useSendOtp(
		data => {
			console.log('OTP sent successfully:', data)
		},
		error => {
			console.error('Failed to send OTP:', error)
		},
	)
	const { mutate: verifyOtp, isPending: isLoading } = useVerifyOtp()

	const {
		initializeTruecaller,
		openTruecallerModal,
		user,
		isTruecallerSupported,
		error,
	} = useTruecaller({
		androidClientId: envConfig.clientId.truecaller.android,
		androidButtonColor: colors.primary[500],
		androidButtonStyle: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_STYLES.ROUND,
		androidButtonText: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_TEXTS.CONTINUE,
		androidButtonTextColor: colors.others.white,
		androidConsentHeading:
			TRUECALLER_ANDROID_CUSTOMIZATIONS.CONSENT_HEADING_TEXTS.LOG_IN_TO,
		androidFooterButtonText:
			TRUECALLER_ANDROID_CUSTOMIZATIONS.FOOTER_BUTTON_TEXTS.ANOTHER_METHOD,
	})

	/* States */
	const [country, setCountry] = useState<Country | undefined>()
	const [showPicker, setShowPicker] = useState(false)

	/* Functions */
	const onSelectCountry = (selectedCountry: Country) => {
		setCountry(selectedCountry)
		setValue('countryCode', `+${selectedCountry.callingCode[0]}`)
	}

	const extractPhoneDetails = (mobileNumber: string) => {
		if (!mobileNumber.startsWith('+')) {
			throw new Error('Invalid mobile number format')
		}
		const countryCode = `+${mobileNumber.slice(1, -10)}`
		const phoneNumber = mobileNumber.slice(-10)
		return { countryCode, phoneNumber }
	}

	const handleTruecallerLogin = () => {
		if (!user?.mobileNumber) return

		try {
			const { countryCode, phoneNumber } = extractPhoneDetails(
				user.mobileNumber,
			)
			const reqData = {
				phoneNumber,
				countryCode,
				role,
				isTruecaller: true,
			}

			verifyOtp(reqData as any, {
				onSuccess: async (response: any) => {
					console.log('Truecaller login success:', response)
					const { user, tokens } = response?.data || {}

					await storeAuthData({
						user,
						accessToken: tokens.accessToken,
						refreshToken: tokens.refreshToken,
					})

					dispatch(authSliceActions.setUser(user))
					dispatch(
						authSliceActions.setTokens({
							accessToken: tokens?.accessToken,
							refreshToken: tokens?.refreshToken,
						}),
					)

					if (user?.isActivated) {
						dispatch(authSliceActions.setIsRegisted(true))
						await setItem(localStoreKeys.IS_REGISTED, true)
					}

					await setItem(localStoreKeys.LOGGED_IN, true)
					dispatch(authSliceActions.setLoggedIn(true))
				},
				onError: error => {
					console.error('Truecaller login error:', error)
				},
			})
		} catch (error) {}
	}

	const onSubmit = (data: EnterNumberFormData) => {
		const reqData = { ...data, channel: 'sms' }
		sendOtp(reqData as any, {
			onSuccess: () => {
				navigation.navigate('EnterOtp', {
					countryCode: data?.countryCode,
					phoneNumber: data?.phoneNumber,
					role,
				})
			},
		})
	}

	/* Side-Effects */
	useEffect(() => {
		const showSub = Keyboard.addListener('keyboardDidShow', e => {
			const offset = e.endCoordinates.height
			Animated.timing(translateY, {
				toValue: -offset * 1.1,
				duration: 700,
				useNativeDriver: true,
			}).start()
		})
		const hideSub = Keyboard.addListener('keyboardDidHide', () => {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 700,
				useNativeDriver: true,
			}).start()
		})

		return () => {
			showSub.remove()
			hideSub.remove()
		}
	}, [])

	useEffect(() => {
		const runTruecaller = async () => {
			await initializeTruecaller()
			if (isTruecallerSupported()) {
				openTruecallerModal()
			}
		}
		runTruecaller()
	}, [])

	useEffect(() => {
		if (user?.mobileNumber) {
			handleTruecallerLogin()
		}
	}, [user])

	/* Output */
	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView
						contentContainerStyle={styles.scrollContainer}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						style={{
							backgroundColor: getThemeColor(
								theme,
								colors.others.white,
								colors.dark.dark1,
							),
						}}>
						{role === 'customer' ? (
							<ProductSlider />
						) : (
							<Image
								source={require('../../../assets/images/deliveryWallpaper.jpg')}
								style={{
									width: windowWidth,
									height: 480 * refHeightCalc,
								}}
							/>
						)}

						<Animated.View
							style={[
								styles.bodyContainer,
								{
									backgroundColor: getThemeColor(
										theme,
										colors.others.white,
										colors.dark.dark1,
									),
								},
								{
									transform: [{ translateY }],
								},
							]}>
							<View>
								<SvgIcon.AppLogo
									width={100 * refWidthCalc}
									height={100 * refHeightCalc}
								/>
							</View>

							<View
								style={{
									gap: 4 * refHeightCalc,
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Text style={getTypographyStyles(theme).headingH3Bold}>
									{tagLine}
								</Text>
								<Text
									style={{
										...getTypographyStyles(theme).bodyXlargeBold,
										color: colors.grey[700],
									}}>
									Log In or Sign Up
								</Text>
							</View>

							{/* Phone Input Section */}
							<View
								style={{
									width: '100%',
									gap: 4 * refHeightCalc,
								}}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										borderWidth: 1,
										borderRadius: 16 * refWidthCalc,
										borderColor: errors.phoneNumber
											? colors.error
											: 'transparent',
										backgroundColor: getThemeColor(
											theme,
											colors.grey[50],
											colors.dark.dark2,
										),
										paddingHorizontal: 12 * refWidthCalc,
									}}>
									{/* Country Picker */}
									<CountryPicker
										withFlag
										withCallingCode
										withEmoji
										withFilter
										withCallingCodeButton
										onSelect={onSelectCountry}
										countryCode={country?.cca2 || 'IN'}
										visible={showPicker}
										onClose={() => setShowPicker(false)}
										theme={{
											backgroundColor: getThemeColor(
												theme,
												colors.others.white,
												colors.dark.dark1,
											),
											fontFamily: fontFamily.semiBold,
											onBackgroundTextColor: getThemeColor(
												theme,
												colors.grey[900],
												colors.grey[100],
											),
										}}
										onOpen={() => {
											if (!isPending) setShowPicker(true)
										}}
									/>

									{/* Divider */}
									<View
										style={{
											width: 2,
											height: 20 * refHeightCalc,
											backgroundColor: colors.grey[500],
											marginHorizontal: 8 * refWidthCalc,
										}}
									/>

									{/* Phone Number Input */}
									<Controller
										control={control}
										name="phoneNumber"
										disabled={isPending}
										render={({ field: { value, onChange } }) => (
											<TextInput
												value={value}
												onChangeText={onChange}
												placeholder="Enter mobile number"
												keyboardType="phone-pad"
												placeholderTextColor={colors.grey[500]}
												style={{
													flex: 1,
													...getTypographyStyles(theme).bodyXlargeSemiBold,
													color: getThemeColor(
														theme,
														colors.grey[900],
														colors.grey[100],
													),
													paddingVertical: 16 * refHeightCalc,
												}}
												selectionColor={colors.primary[500]}
												maxLength={10}
												editable={!isPending}
											/>
										)}
									/>
								</View>

								{/* Error Message */}
								{!!errors.phoneNumber?.message && (
									<View style={styles.errorContainer}>
										<Text
											style={{
												...getTypographyStyles(theme).bodyMediumMedium,
												color: colors.error,
											}}>
											{errors.phoneNumber.message}
										</Text>
									</View>
								)}
							</View>

							{/* Fallback OTP Button */}
							<Button
								title="Send OTP"
								onPress={handleSubmit(onSubmit)}
								buttonStyles={{ width: '100%' }}
								loading={isPending}
								disabled={isPending}
							/>
						</Animated.View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</Wrapper>
	)
}

export default EnterNumber
