/* Imports */
import React from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'

/* Relative Imports */
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import Wrapper from '../../../components/Wrapper'
import colors from '../../../static/colors'
import { getThemeColor } from '../../../utils/helpers'
import { useTheme } from '../../../hooks/useTheme'
import { refHeightCalc, refWidthCalc } from '../../../static/dimensions'
import { RegistrationStackParamList } from '../../../models/navigation/RegistrationStackParamList'
import {
	CreateCustomerProfileFormData,
	CreateCustomerProfileFormSchema,
} from '../../../models/viewModels/customer/onboarding'
import { useCustomerCreateProfile } from '../../../hooks/customer/onboarding/useOnboarding'
import InputField from '../../../components/InputField/InputField'
import BottomNavigationBar from '../../../components/BottomTab/BottomNavigationBar'
import { SvgIcon } from '../../../assets'
import { getTypographyStyles } from '../../../static/gstyles'
import Header from '../../../components/Header/Header'
import { styles } from './index.styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAppDispatch } from '../../../hooks/storeHooks'
import { authSliceActions } from '../../../store/authSlice'
import { setItem, localStoreKeys } from '../../../store/local/asyncStore'

// -------------------------------------------------------------------------------------------------------------------------

type PropsCreateCustomerProfile = NativeStackScreenProps<
	RegistrationStackParamList,
	'CreateCustomerProfile'
>

// -------------------------------------------------------------------------------------------------------------------------

const CreateCustomerProfile: React.FC<PropsCreateCustomerProfile> = ({
	navigation,
}) => {
	/* Constants */
	const profileFields = [
		{
			label: 'First Name',
			type: 'text',
			name: 'firstName',
			placeholder: 'Enter your first name',
		},
		{
			label: 'Last Name',
			type: 'text',
			name: 'lastName',
			placeholder: 'Enter your last name',
		},
		{
			label: 'Email Address',
			type: 'email',
			name: 'email',
			placeholder: 'Enter your email address',
		},
	]

	/* Hooks */
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	const { control, handleSubmit } = useForm<CreateCustomerProfileFormData>({
		resolver: zodResolver(CreateCustomerProfileFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
		},
		mode: 'onChange',
	})
	const { mutate: customerCreateProfile, isPending } =
		useCustomerCreateProfile()

	/* States */

	/* Functions */
	const onSubmit = (data: CreateCustomerProfileFormData) => {
		const reqData = { ...data }

		customerCreateProfile(reqData, {
			onSuccess: async (response: any) => {
				console.log('response', response)
				const newData = response?.data?.customer

				dispatch(authSliceActions.setUser(newData))
				await setItem(localStoreKeys.USER_DATA, newData)

				dispatch(authSliceActions.setIsRegisted(true))
				await setItem(localStoreKeys.IS_REGISTED, true)
			},
			onError: (error: any) => {
				console.log('error', error)
			},
		})
	}

	/* Side-Effects */

	/* Output */
	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
					<Header
						label="Create your profile"
						rightIcon={
							<SvgIcon.ThreeDots
								width={28 * refWidthCalc}
								height={28 * refHeightCalc}
								color={getThemeColor(
									theme,
									colors.grey[900],
									colors.others.white,
								)}
							/>
						}
						titleStyle={getTypographyStyles(theme).headingH4Bold}
						containerStyle={{
							paddingHorizontal: 24 * refWidthCalc,
							paddingVertical: 16 * refHeightCalc,
							gap: 12 * refHeightCalc,
						}}
					/>
					<KeyboardAwareScrollView
						style={styles.container}
						contentContainerStyle={{
							gap: 32 * refHeightCalc,
							paddingHorizontal: 24 * refWidthCalc,
							paddingVertical: 16 * refHeightCalc,
						}}
						showsVerticalScrollIndicator={false}
						scrollEnabled
						enableOnAndroid
						keyboardShouldPersistTaps="handled">
						<View style={{ gap: 16 * refHeightCalc }}>
							{profileFields.map((field, index) => (
								<Controller<CreateCustomerProfileFormData>
									key={index}
									control={control}
									name={field.name as keyof CreateCustomerProfileFormData}
									render={({ field: controllerField, fieldState }) => (
										<InputField
											label={field.label}
											placeholder={field.placeholder}
											value={controllerField.value}
											onChangeText={controllerField.onChange}
											onBlur={controllerField.onBlur}
											error={fieldState.error?.message}
											keyboardType={
												field.type === 'email' ? 'email-address' : 'default'
											}
											editable={!isPending}
										/>
									)}
								/>
							))}
						</View>
					</KeyboardAwareScrollView>

					<BottomNavigationBar
						centerLabel={'Next'}
						onCenterPress={handleSubmit(onSubmit)}
						disabled={isPending}
						loading={isPending}
					/>
				</View>
			</TouchableWithoutFeedback>
		</Wrapper>
	)
}

export default CreateCustomerProfile
