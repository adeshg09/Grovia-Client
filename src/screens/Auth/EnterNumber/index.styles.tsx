/* Imports */
import { StyleSheet } from 'react-native'
import { refHeightCalc, refWidthCalc } from '../../../static/dimensions'
import colors from '../../../static/colors'

/* Styles */
export const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		paddingVertical: 16 * refHeightCalc,
	},
	bodyContainer: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 16 * refHeightCalc,
		paddingHorizontal: 24 * refWidthCalc,
		gap: 16 * refHeightCalc,
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
