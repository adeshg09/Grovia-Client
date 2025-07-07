/* Imports */
import React, { useEffect, useRef, useState } from 'react'
import {
	BackHandler,
	Keyboard,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

/* Local Imports */
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
import { styles } from './index.styles'
import CaptainPersonalBasicInfoDetails, {
	CaptainPersonalBasicInfoRef,
} from './BasicInfoDetails'
import Stepper from '../../../../components/Stepper'
import { StepNavProvider } from '../../../../context/StepNavigationContext'
import { RootState } from 'src/store/store'

// -------------------------------------------------------------------------------------------------------------------------

type PropsCaptainPersonalDetails = NativeStackScreenProps<
	RegistrationStackParamList,
	'CaptainPersonalDetails'
>

const CaptainPersonalDetails: React.FC<PropsCaptainPersonalDetails> = ({
	navigation,
}) => {
	/* Hooks */
	const { theme } = useTheme()
	const basicInfoRef = useRef<CaptainPersonalBasicInfoRef>(null)
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	console.log('onboardingState', onboardingState)

	/* Constants */
	const steps = ['Basic Info']
	const isStepCompleted = onboardingState.progress.step1.basicInfoDetails

	console.log('isStepCompleted', isStepCompleted)

	/* States */
	const [isLoading, setIsLoading] = useState(false)

	/* Functions */
	const handleNext = () => {
		basicInfoRef.current?.submit()
	}

	const handleGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack()
		}
		return true
	}

	/* Side-Effects */
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			handleGoBack,
		)

		return () => backHandler.remove()
	}, [])

	/* Output */
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
							label="Personal Details"
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
							<Stepper
								currentPosition={0}
								labels={steps}
								completedSteps={[
									onboardingState.progress.step1.basicInfoDetails,
								]}
							/>
							<View style={{ gap: 8 * refHeightCalc }}>
								<Text style={getTypographyStyles(theme).headingH4Bold}>
									Provide your Basic Information 👤
								</Text>
							</View>

							<CaptainPersonalBasicInfoDetails
								ref={basicInfoRef}
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

export default CaptainPersonalDetails
