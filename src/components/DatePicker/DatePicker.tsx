import React, { useState } from 'react'
import {
	View,
	Text,
	Modal,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import colors from '../../static/colors'
import {
	refHeightCalc,
	refWidthCalc,
	windowWidth,
} from '../../static/dimensions'
import { getTypographyStyles } from '../../static/gstyles'
import { getThemeColor } from '../../utils/helpers'
import Button from '../Buttons/Button'
import { SvgIcon } from '../../assets'

interface CustomDatePickerProps {
	visible: boolean
	onClose: () => void
	onDateSelect: (date: string) => void
	selectedDate?: string
	title?: string
	minDate?: Date
	maxDate?: Date
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	visible,
	onClose,
	onDateSelect,
	selectedDate,
	title = 'Select Date',
	minDate,
	maxDate,
}) => {
	const { theme } = useTheme()

	// State for date components
	const [selectedDay, setSelectedDay] = useState<number>(
		selectedDate ? new Date(selectedDate).getDate() : new Date().getDate(),
	)
	const [selectedMonth, setSelectedMonth] = useState<number>(
		selectedDate ? new Date(selectedDate).getMonth() : new Date().getMonth(),
	)
	const [selectedYear, setSelectedYear] = useState<number>(
		selectedDate
			? new Date(selectedDate).getFullYear()
			: new Date().getFullYear(),
	)

	// Generate arrays for picker options
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const currentYear = new Date().getFullYear()
	const years = Array.from(
		{ length: currentYear - 1900 + 1 },
		(_, i) => 1900 + i,
	)

	const getDaysInMonth = (month: number, year: number) => {
		return new Date(year, month + 1, 0).getDate()
	}

	const days = Array.from(
		{ length: getDaysInMonth(selectedMonth, selectedYear) },
		(_, i) => i + 1,
	)

	const handleConfirm = () => {
		// Create date in local timezone without time components
		const date = new Date(selectedYear, selectedMonth, selectedDay)

		// Format the date correctly without timezone interference
		const formattedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(
			2,
			'0',
		)}-${String(selectedDay).padStart(2, '0')}`

		console.log('date', date)
		console.log('formattedDate', formattedDate)

		onDateSelect(formattedDate)
		onClose()
	}

	const handleCancel = () => {
		// Reset to original selected date or current date
		if (selectedDate) {
			const date = new Date(selectedDate)
			setSelectedDay(date.getDate())
			setSelectedMonth(date.getMonth())
			setSelectedYear(date.getFullYear())
		} else {
			const date = new Date()
			setSelectedDay(date.getDate())
			setSelectedMonth(date.getMonth())
			setSelectedYear(date.getFullYear())
		}
		onClose()
	}

	const renderPickerColumn = (
		items: (string | number)[],
		selectedValue: string | number,
		onValueChange: (value: any) => void,
		label: string,
	) => (
		<View style={styles.pickerColumn}>
			<Text
				style={[
					getTypographyStyles(theme).bodyMediumSemiBold,
					{ color: getThemeColor(theme, colors.grey[600], colors.grey[300]) },
				]}>
				{label}
			</Text>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}>
				{items.map((item, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.pickerItem,
							{
								backgroundColor:
									selectedValue === item
										? getThemeColor(
												theme,
												colors.primary[100],
												colors.primary[800],
										  )
										: 'transparent',
								borderColor:
									selectedValue === item
										? getThemeColor(
												theme,
												colors.primary[500],
												colors.primary[400],
										  )
										: getThemeColor(theme, colors.grey[200], colors.grey[700]),
							},
						]}
						onPress={() =>
							onValueChange(typeof item === 'string' ? index : item)
						}>
						<Text
							style={[
								getTypographyStyles(theme).bodyMediumRegular,
								{
									color:
										selectedValue === item
											? getThemeColor(
													theme,
													colors.primary[700],
													colors.primary[200],
											  )
											: getThemeColor(
													theme,
													colors.grey[700],
													colors.grey[200],
											  ),
								},
							]}>
							{item}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	)

	return (
		<Modal
			animationType="fade"
			transparent
			visible={visible}
			onRequestClose={onClose}>
			<View style={styles.overlay}>
				<View
					style={[
						styles.modalContainer,
						{
							backgroundColor: getThemeColor(
								theme,
								colors.others.white,
								colors.dark.dark3,
							),
						},
					]}>
					{/* Header */}
					<View style={styles.header}>
						<SvgIcon.Calender
							width={24 * refWidthCalc}
							height={24 * refHeightCalc}
							color={getThemeColor(
								theme,
								colors.primary[500],
								colors.primary[400],
							)}
						/>
						<Text
							style={[
								getTypographyStyles(theme).headingH4Bold,
								{ textAlign: 'center' },
							]}>
							{title}
						</Text>
					</View>

					{/* Selected Date Display */}
					<View
						style={[
							styles.selectedDateContainer,
							{
								backgroundColor: getThemeColor(
									theme,
									colors.grey[50],
									colors.dark.dark2,
								),
								borderColor: getThemeColor(
									theme,
									colors.grey[200],
									colors.grey[600],
								),
							},
						]}>
						<Text
							style={[
								getTypographyStyles(theme).bodyLargeSemiBold,
								{
									color: getThemeColor(
										theme,
										colors.grey[700],
										colors.grey[200],
									),
								},
							]}>
							{`${months[selectedMonth]} ${selectedDay}, ${selectedYear}`}
						</Text>
					</View>

					{/* Date Picker */}
					<View style={styles.pickerContainer}>
						{renderPickerColumn(
							months,
							months[selectedMonth],
							setSelectedMonth,
							'Month',
						)}
						{renderPickerColumn(days, selectedDay, setSelectedDay, 'Day')}
						{renderPickerColumn(years, selectedYear, setSelectedYear, 'Year')}
					</View>

					{/* Action Buttons */}
					<View style={styles.buttonContainer}>
						<Button
							title="Cancel"
							onPress={handleCancel}
							buttonStyles={[
								styles.button,
								{
									backgroundColor: 'transparent',
									borderWidth: 1,
									borderColor: getThemeColor(
										theme,
										colors.grey[300],
										colors.grey[600],
									),
								},
							]}
							textStyles={{
								color: getThemeColor(theme, colors.grey[700], colors.grey[200]),
							}}
						/>
						<Button
							title="Confirm"
							onPress={handleConfirm}
							buttonStyles={styles.button}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default CustomDatePicker

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: colors.others.overlay,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		borderRadius: 24 * refWidthCalc,
		paddingHorizontal: 24 * refWidthCalc,
		paddingVertical: 32 * refHeightCalc,
		gap: 24 * refHeightCalc,
		width: windowWidth * 0.9,
		maxHeight: '80%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		alignItems: 'center',
		gap: 12 * refHeightCalc,
	},
	selectedDateContainer: {
		paddingHorizontal: 16 * refWidthCalc,
		paddingVertical: 12 * refHeightCalc,
		borderRadius: 12 * refWidthCalc,
		borderWidth: 1,
		width: '100%',
		alignItems: 'center',
	},
	pickerContainer: {
		flexDirection: 'row',
		gap: 12 * refWidthCalc,
		width: '100%',
		maxHeight: 200 * refHeightCalc,
	},
	pickerColumn: {
		flex: 1,
		gap: 8 * refHeightCalc,
	},
	scrollView: {
		maxHeight: 160 * refHeightCalc,
	},
	scrollContent: {
		gap: 4 * refHeightCalc,
	},
	pickerItem: {
		paddingVertical: 8 * refHeightCalc,
		paddingHorizontal: 12 * refWidthCalc,
		borderRadius: 8 * refWidthCalc,
		borderWidth: 1,
		alignItems: 'center',
		minHeight: 36 * refHeightCalc,
		justifyContent: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 12 * refWidthCalc,
		width: '100%',
	},
	button: {
		flex: 1,
	},
})
