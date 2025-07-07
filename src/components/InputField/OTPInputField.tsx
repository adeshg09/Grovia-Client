/* Imports */
import { useState, type RefObject, useEffect } from 'react'
import {
	TextInput,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'

/* Relative Imports */

/* Local Imports */
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import colors from '../../static/colors'
import { useTheme } from '../../hooks/useTheme'
import { getTypographyStyles } from '../../static/gstyles'
import { SvgIcon } from '../../assets'
import { getThemeColor } from '../../utils/helpers'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface OTPInputFieldProps {
	codes: string[]
	refs: RefObject<TextInput>[]
	onChangeCode: (codes: string[]) => void
	config: OTPInputFieldConfig
	errorMessage?: string
	onResendOtp?: () => void
	canResend?: boolean
	timer?: number
}

interface OTPInputFieldConfig {
	backgroundColor: string
	textColor: string
	borderColor: string
	focusBorderColor: string
	focusBackgroundColor: string
	errorColor?: string
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Enhanced OTP Input Field Component
 *
 * @component
 */
export function OTPInputField({
	codes,
	refs,
	onChangeCode,
	config,
	errorMessage,
	onResendOtp,
	canResend = false,
	timer = 0,
}: OTPInputFieldProps) {
	/* Constants */
	const { theme } = useTheme()
	const styles = createStyles(config)
	const OTP_LENGTH = 6

	/* States */
	const [focusedIndex, setFocusedIndex] = useState<number | null>(0)

	/* Functions */
	const handleFocus = (index: number) => setFocusedIndex(index)
	const handleBlur = () => setFocusedIndex(null)

	const handleChangeText = (text: string, index: number) => {
		// Handle paste - if pasting in first field
		if (index === 0 && text.length > 1) {
			const pastedCode = text.slice(0, OTP_LENGTH).split('')
			const newCodes = [...codes]

			// Fill the codes array with pasted digits
			pastedCode.forEach((digit, idx) => {
				if (idx < OTP_LENGTH && /^\d$/.test(digit)) {
					newCodes[idx] = digit
				}
			})

			onChangeCode(newCodes)

			// Focus the last filled input or the next empty one
			const nextEmptyIndex = newCodes.findIndex(code => code === '')
			const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : OTP_LENGTH - 1
			setTimeout(() => refs[focusIndex]?.current?.focus(), 50)
			return
		}

		// Handle single digit input
		if (/^\d?$/.test(text)) {
			const newCodes = [...codes]
			newCodes[index] = text
			onChangeCode(newCodes)

			// Auto focus next field if digit entered
			if (text && index < OTP_LENGTH - 1) {
				setTimeout(() => refs[index + 1]?.current?.focus(), 50)
			}
		}
	}

	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === 'Backspace') {
			const newCodes = [...codes]

			if (codes[index]) {
				// Clear current field if it has value
				newCodes[index] = ''
			} else if (index > 0) {
				// Move to previous field and clear it if current is empty
				newCodes[index - 1] = ''
				setTimeout(() => refs[index - 1]?.current?.focus(), 50)
			}

			onChangeCode(newCodes)
		}
	}

	/* Side-Effects */
	// Focus first input on mount
	useEffect(() => {
		const timeout = setTimeout(() => {
			refs[0]?.current?.focus()
		}, 100)
		return () => clearTimeout(timeout)
	}, [])

	/* Output */
	return (
		<>
			<View style={styles.container}>
				{Array.from({ length: OTP_LENGTH }, (_, index) => (
					<TextInput
						key={index}
						autoComplete="one-time-code"
						enterKeyHint="next"
						style={[
							styles.input,
							{
								...getTypographyStyles(theme).headingH4Bold,
								borderColor: errorMessage
									? config.errorColor || colors.error[500]
									: focusedIndex === index
									? config.focusBorderColor
									: config.borderColor,
								backgroundColor:
									focusedIndex === index || codes[index] !== ''
										? config.focusBackgroundColor
										: config.backgroundColor,
							},
							errorMessage && styles.errorInput,
							focusedIndex === index && styles.focusedInput,
							codes[index] !== '' && styles.filledInput,
						]}
						inputMode="numeric"
						value={codes[index] || ''}
						onFocus={() => handleFocus(index)}
						onBlur={handleBlur}
						onChangeText={text => handleChangeText(text, index)}
						onKeyPress={e => handleKeyPress(e, index)}
						maxLength={index === 0 ? OTP_LENGTH : 1} // First field can accept pasted OTP
						ref={refs[index]}
						selectionColor={config.focusBorderColor}
					/>
				))}
			</View>

			{!!errorMessage && (
				<View style={styles.errorContainer}>
					<SvgIcon.Error
						width={18 * refWidthCalc}
						height={18 * refHeightCalc}
						color={colors.error}
					/>
					<Text
						style={{
							...getTypographyStyles(theme).bodyMediumMedium,
							color: colors.others.red,
						}}>
						{errorMessage}
					</Text>
				</View>
			)}

			<View style={styles.actionsContainer}>
				<TouchableOpacity
					onPress={onResendOtp}
					disabled={!canResend}
					style={styles.resendButton}
					accessibilityLabel="Resend OTP Code">
					<Text
						style={{
							...getTypographyStyles(theme).bodyXlargeMedium,
							color: getThemeColor(theme, colors.grey[700], colors.grey[200]),
						}}>
						{!canResend
							? `You can resend the code in ${timer} seconds`
							: 'Resend OTP Code'}
					</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

/* Styles */
const createStyles = (config: OTPInputFieldConfig) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%',
			gap: 8 * refWidthCalc,
		},
		input: {
			flex: 1,
			height: 60 * refHeightCalc,
			paddingVertical: 16 * refHeightCalc,
			paddingHorizontal: 12 * refWidthCalc,
			borderRadius: 12 * refWidthCalc,
			textAlign: 'center',
			borderWidth: 1,
			backgroundColor: config.backgroundColor,
			color: config.textColor,
		},
		errorInput: {
			borderColor: config.errorColor || colors.error[500],
		},
		focusedInput: {
			borderColor: config.focusBorderColor,
			backgroundColor: config.focusBackgroundColor,
		},
		filledInput: {
			backgroundColor: config.focusBackgroundColor,
			borderColor: config.focusBorderColor,
		},
		actionsContainer: {
			alignItems: 'center',
			marginTop: 16 * refHeightCalc,
		},
		resendButton: {
			padding: 8 * refWidthCalc,
		},
		resendButtonText: {
			color: colors.primary[500],
			fontSize: 14,
			fontWeight: '600',
			textAlign: 'center',
		},
		disabledText: {
			color: colors.grey[500],
		},
		errorContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			borderRadius: 6 * refWidthCalc,
			paddingHorizontal: 12 * refWidthCalc,
			paddingVertical: 8 * refHeightCalc,
			gap: 8 * refWidthCalc,
			backgroundColor: colors.transparent.red,
			marginTop: 8 * refHeightCalc,
		},
	})
