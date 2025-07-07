/* Imports */
import { StyleSheet } from 'react-native'
import { refHeightCalc, refWidthCalc } from '../../../static/dimensions'

/* Styles */
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24 * refWidthCalc,
	},
	textContainer: {
		gap: 12 * refHeightCalc,
	},
	inputContainer: {
		gap: 16 * refHeightCalc,
	},
})
