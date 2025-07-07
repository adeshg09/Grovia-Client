import React, { useState } from 'react'
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInputProps,
	GestureResponderEvent,
} from 'react-native'
import colors from '../../static/colors'
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'
import { useTheme } from '../../hooks/useTheme'
import { getThemeColor } from '../../utils/helpers'
import { SvgIcon } from '../../assets'

type InputFieldProps = TextInputProps & {
	label?: string
	error?: string
	showClear?: boolean
	onClear?: (event: GestureResponderEvent) => void
	secureTextEntry?: boolean
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	error,
	showClear = true,
	onClear,
	style,
	value,
	onChangeText,
	placeholder,
	secureTextEntry = false,
	iconLeft,
	iconRight,
	keyboardType,
	...rest
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const { theme, toggleTheme } = useTheme()

	return (
		<View style={styles.container}>
			{label && (
				<Text
					style={{
						...getTypographyStyles(theme).bodyXlargeSemiBold,
					}}>
					{label}
				</Text>
			)}

			<View
				style={[
					styles.InputFieldWrapper,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.grey[200],
							colors.dark.dark2,
						),
						borderColor: getThemeColor(
							theme,
							colors.grey[200],
							colors.dark.dark3,
						),
					},
					// isFocused && styles.InputFieldFocused,
					error && styles.InputFieldError,
					style,
				]}>
				{iconLeft && iconLeft}

				<TextInput
					style={[
						styles.InputField,
						{
							...getTypographyStyles(theme).bodyXlargeSemiBold,
						},
					]}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={colors.grey[500]}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					{...rest}
					selectionColor={colors.primary[500]}
					numberOfLines={1}
				/>

				{iconRight && iconRight}
			</View>

			{!!error && (
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
						{error}
					</Text>
				</View>
			)}
		</View>
	)
}

export default InputField

const styles = StyleSheet.create({
	container: {
		gap: 8 * refHeightCalc,
	},
	InputFieldWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 10 * refWidthCalc,
		paddingHorizontal: 20 * refWidthCalc,
		paddingVertical: 8 * refHeightCalc,
		gap: 12 * refWidthCalc,
	},
	InputFieldFocused: {
		borderColor: colors.primary[500],
	},
	InputFieldError: {
		borderColor: colors.error[600],
	},
	InputField: {
		flex: 1,
	},
	clearButton: {
		paddingHorizontal: 6 * refWidthCalc,
	},
	clearText: {
		fontSize: 20 * refHeightCalc,
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
	},
})
