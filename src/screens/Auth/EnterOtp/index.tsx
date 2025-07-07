/* Imports */
import React, { useRef, useState, useEffect } from 'react'
import { Text, TextInput, View, ScrollView } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

/* Local Imports */
import { AuthStackParamList } from '../../../models/navigation/AuthStackParamList'
import { useTheme } from '../../../hooks/useTheme'
import {
	EnterOtpFormData,
	EnterOtpFormSchema,
} from '../../../models/viewModels/auth'
import { useSendOtp, useVerifyOtp } from '../../../hooks/auth/useAuth'
import Wrapper from '../../../components/Wrapper'
import colors from '../../../static/colors'
import { getThemeColor } from '../../../utils/helpers'
import { refHeightCalc, refWidthCalc } from '../../../static/dimensions'
import { SvgIcon } from '../../../assets'
import { getTypographyStyles } from '../../../static/gstyles'
import { styles } from './index.styles'
import { OTPInputField } from '../../../components/InputField/OTPInputField'
import Header from '../../../components/Header/Header'
import BottomNavigationBar from '../../../components/BottomTab/BottomNavigationBar'
import {
	localStoreKeys,
	setItem,
	storeAuthData,
} from '../../../store/local/asyncStore'
import { useAppDispatch } from '../../../hooks/storeHooks'
import { authSliceActions } from '../../../store/authSlice'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */

type PropsEnterOtp = NativeStackScreenProps<AuthStackParamList, 'EnterOtp'>

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the EnterOtp Screen.
 *
 * @component
 */
const EnterOtp: React.FC<PropsEnterOtp> = ({ navigation, route }) => {
	/* Constants */
	const { countryCode, phoneNumber, role } = route.params
	console.log('route.params', route.params)
	const maskedPhone = `${countryCode} ******${phoneNumber.slice(-4)}`
	const OTP_LENGTH = 6
	const otpRefs = Array(OTP_LENGTH)
		.fill(0)
		.map(() => useRef<TextInput>(null))

	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<EnterOtpFormData>({
		resolver: zodResolver(EnterOtpFormSchema),
		defaultValues: {
			otp: ['', '', '', '', '', ''],
		},
		mode: 'onSubmit',
	})

	const { mutate: verifyOtp, isPending: isLoading } = useVerifyOtp()
	const { mutate: resendOtp, isPending: isResending } = useSendOtp()

	/* States */
	const [otpTimer, setOtpTimer] = useState(60)
	const [canResend, setCanResend] = useState(false)

	/* Functions */
	const onSubmit = (data: EnterOtpFormData) => {
		const reqData = { otp: data?.otp?.join(''), phoneNumber, countryCode, role }

		verifyOtp(reqData as any, {
			onSuccess: async (response: any) => {
				console.log('OTP verified successfully:', response)

				const { user, tokens } = response?.data || {}

				console.log('user', user)

				await storeAuthData({
					user,
					accessToken: tokens?.accessToken,
					refreshToken: tokens?.refreshToken,
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
			onError: (error: any) => {
				console.error('Failed to verify OTP:', error)
			},
		})
	}

	const handleResendOtp = () => {
		if (!canResend || isResending) return

		resendOtp(
			{ countryCode, phoneNumber, channel: 'sms' },
			{
				onSuccess: (response: any) => {
					console.log('OTP resent successfully:', response)
					setValue('otp', ['', '', '', '', '', ''])
					setOtpTimer(60)
					setCanResend(false)
				},
				onError: (error: any) => {
					console.error('Failed to resend OTP:', error)
				},
			},
		)
	}

	/* Side-Effects */
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setOtpTimer(prev => {
	// 			if (prev <= 1) {
	// 				clearInterval(interval)
	// 				setCanResend(true)
	// 				return 0
	// 			}
	// 			return prev - 1
	// 		})
	// 	}, 1000)

	// 	return () => clearInterval(interval)
	// }, [])

	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<ScrollView
				style={[
					styles.container,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark1,
						),
					},
				]}
				contentContainerStyle={{
					gap: 32 * refHeightCalc,
					paddingTop: 16 * refHeightCalc,
					paddingBottom: 32 * refHeightCalc,
				}}
				showsVerticalScrollIndicator={false}>
				<Header
					leftIcon={
						<SvgIcon.ArrowLeft
							width={28 * refWidthCalc}
							height={28 * refHeightCalc}
							color={getThemeColor(
								theme,
								colors.grey[900],
								colors.others.white,
							)}
						/>
					}
					onPressLeft={() => navigation.goBack()}
					disabled={isLoading || isResending}
				/>
				<View style={styles.textContainer}>
					<Text
						style={{
							...getTypographyStyles(theme).headingH3Bold,
						}}>
						Enter OTP Code 🔐
					</Text>
					<Text
						style={{
							...getTypographyStyles(theme).bodyXlargeRegular,
							color: getThemeColor(theme, colors.grey[700], colors.grey[200]),
						}}>
						{`Enter the code sent on mobile no. ${maskedPhone} to verify your account.`}
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						name="otp"
						render={({ field: { value, onChange } }) => (
							<OTPInputField
								codes={value || ['', '', '', '', '', '']}
								onChangeCode={newCodes => {
									onChange(newCodes)
								}}
								refs={otpRefs}
								config={{
									backgroundColor: getThemeColor(
										theme,
										colors.grey[50],
										colors.dark.dark3,
									),
									textColor: getThemeColor(
										theme,
										colors.grey[900],
										colors.others.white,
									),
									borderColor: getThemeColor(
										theme,
										colors.grey[50],
										colors.dark.dark3,
									),
									errorColor: colors.others.red,
									focusBackgroundColor: colors.transparent.purple,
									focusBorderColor: colors.primary[500],
								}}
								errorMessage={errors?.otp?.message}
								onResendOtp={handleResendOtp}
								canResend={canResend}
								timer={otpTimer}
							/>
						)}
					/>
				</View>
			</ScrollView>
			<BottomNavigationBar
				centerLabel="Verify"
				onCenterPress={handleSubmit(onSubmit)}
				loading={isLoading}
				disabled={isLoading || isResending}
			/>
		</Wrapper>
	)
}

export default EnterOtp
