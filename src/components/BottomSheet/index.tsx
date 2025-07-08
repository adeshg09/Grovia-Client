/* Imports */
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'

/* Relative Imports */
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetProps,
	BottomSheetView,
} from '@gorhom/bottom-sheet'

/* Local Imports */
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import colors from '../../static/colors'
import { getThemeColor } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'

/* Interface */
export interface CustomBottomSheetRef {
	expand: () => void
	close: () => void
}

interface CustomBottomSheetProps extends Partial<BottomSheetProps> {
	children: React.ReactNode
	snapPoints?: (string | number)[]
	index?: number
	backdropPressBehavior?: 'none' | 'close' | 'collapse'
}

/**
 * Component to create a reusable CustomBottomSheet.
 *
 * @component
 */
const CustomBottomSheet = forwardRef<
	CustomBottomSheetRef,
	CustomBottomSheetProps
>(({ children, snapPoints = ['25%', '50%'], index = -1, ...rest }, ref) => {
	/* Hooks */
	const { theme, toggleTheme } = useTheme()
	const sheetRef = useRef<BottomSheet>(null)
	const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints])

	/* Expose Methods to Parent */
	useImperativeHandle(ref, () => ({
		expand: () => sheetRef.current?.expand(),
		close: () => sheetRef.current?.close(),
	}))

	/* Functions */
	const renderBackdrop = (props: BottomSheetBackdropProps) => (
		<BottomSheetBackdrop
			{...props}
			disappearsOnIndex={-1}
			appearsOnIndex={0}
			style={{
				backgroundColor: 'rgba(9, 16, 29, 1)',
			}}
			pressBehavior={rest.backdropPressBehavior || 'close'}
		/>
	)

	/* Output */
	return (
		<BottomSheet
			ref={sheetRef}
			index={index}
			snapPoints={memoizedSnapPoints}
			enablePanDownToClose
			backgroundStyle={{
				backgroundColor: getThemeColor(
					theme,
					colors.others.white,
					colors.dark.dark2,
				),
				borderTopLeftRadius: 44 * refHeightCalc,
				borderTopRightRadius: 44 * refHeightCalc,
				borderWidth: 1,
				borderColor: getThemeColor(theme, colors.grey[100], colors.dark.dark3),
			}}
			backdropComponent={renderBackdrop}
			handleIndicatorStyle={{
				backgroundColor: getThemeColor(
					theme,
					colors.grey[300],
					colors.dark.dark3,
				),
			}}
			{...rest}>
			<BottomSheetView style={styles.container}>{children}</BottomSheetView>
		</BottomSheet>
	)
})

export default CustomBottomSheet

/* Styles */
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24 * refWidthCalc,
		paddingTop: 8 * refHeightCalc,
		paddingBottom: 36 * refHeightCalc,
		gap: 24 * refWidthCalc,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
