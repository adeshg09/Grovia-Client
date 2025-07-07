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
import Stepper from '../../../../components/Stepper'
import { StepNavProvider } from '../../../../context/StepNavigationContext'
import { RootState } from '../../../../store/store'
import VehicleTypeSelection, {
	CaptainWorkVehicleTypeRef,
} from './VehicleSelection'
import WorkCitySelection, { CaptainWorkCityRef } from './CitySelection'
import OutletSelection, { CaptainWorkOutleteRef } from './OutletSelection'

// -------------------------------------------------------------------------------------------------------------------------

type Props = NativeStackScreenProps<
	RegistrationStackParamList,
	'CaptainWorkPreferences'
>

const CaptainWorkPreferences: React.FC<Props> = ({ navigation }) => {
	/* Hooks */
	const { theme } = useTheme()
	const onboardingState = useAppSelector((state: RootState) => state.captain)

	/* Refs */
	const vehicleTypeRef = useRef<CaptainWorkVehicleTypeRef>(null)
	const workCityRef = useRef<CaptainWorkCityRef>(null)
	const outletSelectionRef = useRef<CaptainWorkOutleteRef>(null)

	/* Constants */
	const steps = ['Vehicle Type', 'Work City', 'Outlet']
	const isStepCompleted = [
		onboardingState.progress.step2.vehicleType,
		onboardingState.progress.step2.workCity,
		onboardingState.progress.step2.outletId,
	]

	/*  States */
	const [currentSubStep, setCurrentSubStep] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	/* Functions */
	const handleNext = () => {
		if (currentSubStep === 0) {
			vehicleTypeRef.current?.submit()
		} else if (currentSubStep === 1) {
			workCityRef.current?.submit()
		} else if (currentSubStep === 2) {
			outletSelectionRef.current?.submit()
		}
	}

	const goToNextStep = () => {
		if (currentSubStep < 2) {
			setCurrentSubStep(prev => prev + 1)
		} else {
			navigation.navigate('CaptainOnboardingOverview')
		}
	}
	const handleGoBack = () => {
		console.log('currentSubStep', currentSubStep)
		if (currentSubStep > 0) {
			setCurrentSubStep(prev => prev - 1)
		} else {
			navigation.navigate('CaptainOnboardingOverview')
		}
		return true
	}

	const renderSubStep = () => {
		if (currentSubStep === 0) {
			return (
				<VehicleTypeSelection
					ref={vehicleTypeRef}
					navigation={navigation}
					goToNextStep={goToNextStep}
					setIsLoading={setIsLoading}
				/>
			)
		} else if (currentSubStep === 1) {
			return (
				<WorkCitySelection
					ref={workCityRef}
					navigation={navigation}
					goToNextStep={goToNextStep}
					setIsLoading={setIsLoading}
				/>
			)
		} else if (currentSubStep === 2) {
			return (
				<OutletSelection
					ref={outletSelectionRef}
					navigation={navigation}
					goToNextStep={goToNextStep}
					setIsLoading={setIsLoading}
				/>
			)
		}
	}

	/* Side-Effects */
	useEffect(() => {
		const initialStep = [
			!onboardingState.progress.step2.vehicleType,
			!onboardingState.progress.step2.workCity,
			!onboardingState.progress.step2.outletId,
		].findIndex(step => step === true)

		setCurrentSubStep(initialStep === -1 ? 2 : initialStep)
	}, [])

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
							{
								flex: 1,
								backgroundColor: getThemeColor(
									theme,
									colors.others.white,
									colors.dark.dark1,
								),
							},
						]}>
						{/* Header */}
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
							label="Work Preferences"
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

						{/* Body */}
						<View
							style={{
								flex: 1,
								gap: 32 * refHeightCalc,
								paddingHorizontal: 24 * refWidthCalc,
								paddingVertical: 16 * refHeightCalc,
							}}>
							<Stepper
								currentPosition={currentSubStep}
								labels={steps}
								completedSteps={isStepCompleted}
							/>

							<Text style={getTypographyStyles(theme).headingH4Bold}>
								Select {steps[currentSubStep]}
							</Text>

							{renderSubStep()}
						</View>
						{/* Bottom Navigation */}
						<BottomNavigationBar
							centerLabel={isStepCompleted[currentSubStep] ? 'Update' : 'Next'}
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

export default CaptainWorkPreferences
