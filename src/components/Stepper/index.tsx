/* Imports */
import React from 'react'
import { Text, View } from 'react-native'

/* Relative Imports */
import StepIndicator from 'react-native-step-indicator'

/* Local Imports */
import { refWidthCalc } from '../../static/dimensions'
import colors from '../../static/colors'
import { fontFamily } from '../../static/fonts'

interface StepperProps {
	currentPosition: number
	labels: string[]
	completedSteps: boolean[]
}

const Stepper: React.FC<StepperProps> = ({
	currentPosition,
	labels,
	completedSteps,
}) => {
	const customStyles = {
		stepIndicatorSize: 25,
		currentStepIndicatorSize: 30,
		separatorStrokeWidth: 4,
		currentStepStrokeWidth: 3,
		stepStrokeCurrentColor: colors.primary[500],
		stepStrokeWidth: 2,
		stepStrokeFinishedColor: colors.primary[500],
		stepStrokeUnFinishedColor: colors.grey[300],
		separatorFinishedColor: colors.primary[500],
		separatorUnFinishedColor: colors.grey[300],
		stepIndicatorFinishedColor: colors.primary[500],
		stepIndicatorUnFinishedColor: colors.grey[200],
		stepIndicatorCurrentColor: colors.secondary[500],
		labelColor: colors.grey[500],
		labelSize: 16 * refWidthCalc,
		labelFontFamily: fontFamily.semiBold,
		currentStepLabelColor: colors.primary[500],
	}

	const renderStepIndicator = ({ position }: { position: number }) => {
		const isCompleted = completedSteps?.[position] === true

		return (
			<View
				style={{
					width: 25,
					height: 25,
					borderRadius: 25,
					backgroundColor: isCompleted ? colors.success : colors.grey[300],
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text
					style={{
						color: isCompleted ? 'white' : colors.others.black,
						fontSize: 14,
						fontWeight: 'bold',
					}}>
					{isCompleted ? '✓' : position + 1}
				</Text>
			</View>
		)
	}

	return (
		<StepIndicator
			customStyles={customStyles}
			currentPosition={currentPosition}
			stepCount={labels.length}
			labels={labels}
			renderStepIndicator={renderStepIndicator}
		/>
	)
}

export default Stepper
