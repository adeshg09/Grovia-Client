// CaptainBankDetails.tsx

import React, { useEffect, useRef, useState } from 'react'
import {
	BackHandler,
	Keyboard,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { RegistrationStackParamList } from '../../../../models/navigation/RegistrationStackParamList'
import Wrapper from '../../../../components/Wrapper'
import { useAppSelector } from '../../../../hooks/storeHooks'
import colors from '../../../../static/colors'
import { getTypographyStyles } from '../../../../static/gstyles'
import { getThemeColor } from '../../../../utils/helpers'
import { useTheme } from '../../../../hooks/useTheme'
import Header from '../../../../components/Header/Header'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { SvgIcon } from '../../../../assets'
import BottomNavigationBar from '../../../../components/BottomTab/BottomNavigationBar'
import Stepper from '../../../../components/Stepper'
import { StepNavProvider } from '../../../../context/StepNavigationContext'
import { RootState } from 'src/store/store'
import CaptainBankBasicDetails, {
	CaptainBankBasicDetailsRef,
} from './BankInfoDetails'

type Props = NativeStackScreenProps<
	RegistrationStackParamList,
	'CaptainBankDetails'
>

const CaptainBankDetails: React.FC<Props> = ({ navigation }) => {
	const { theme } = useTheme()
	const bankDetailsRef = useRef<CaptainBankBasicDetailsRef>(null)
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	console.log('onboardingState', onboardingState)

	const steps = ['Bank Details']
	const isStepCompleted = onboardingState.progress.step3.bankInfoDetails

	const [isLoading, setIsLoading] = useState(false)

	const handleNext = () => {
		bankDetailsRef.current?.submit()
	}

	const handleGoBack = () => {
		if (navigation.canGoBack()) navigation.goBack()
		return true
	}

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			handleGoBack,
		)
		return () => backHandler.remove()
	}, [])

	return (
		<StepNavProvider>
			<Wrapper
				statusBarColor={getThemeColor(
					theme,
					colors.others.white,
					colors.dark.dark1,
				)}
				statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View
						style={{
							flex: 1,
							backgroundColor: getThemeColor(
								theme,
								colors.others.white,
								colors.dark.dark1,
							),
						}}>
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
							onPressLeft={handleGoBack}
							label="Bank Details"
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
							contentContainerStyle={{
								gap: 32 * refHeightCalc,
								paddingHorizontal: 24 * refWidthCalc,
								paddingVertical: 16 * refHeightCalc,
							}}
							showsVerticalScrollIndicator={false}
							scrollEnabled
							enableOnAndroid
							keyboardShouldPersistTaps="handled"
							enableAutomaticScroll
							extraScrollHeight={64 * refHeightCalc}>
							<Stepper
								currentPosition={0}
								labels={steps}
								completedSteps={[isStepCompleted]}
							/>

							<Text style={getTypographyStyles(theme).headingH4Bold}>
								Provide your bank details 🏦
							</Text>

							<CaptainBankBasicDetails
								ref={bankDetailsRef}
								navigation={navigation}
								setIsLoading={setIsLoading}
							/>
						</KeyboardAwareScrollView>

						<BottomNavigationBar
							centerLabel={isStepCompleted ? 'Update' : 'Next'}
							onCenterPress={handleNext}
							disabled={isLoading}
							loading={isLoading}
						/>
					</View>
				</TouchableWithoutFeedback>
			</Wrapper>
		</StepNavProvider>
	)
}

export default CaptainBankDetails
