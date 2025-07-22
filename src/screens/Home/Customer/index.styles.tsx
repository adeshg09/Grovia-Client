/* Imports */
import { Platform, StyleSheet } from 'react-native'
import colors from '../../../static/colors'
import {
	refHeightCalc,
	refWidthCalc,
	windowHeight,
} from '../../../static/dimensions'

/* Local Imports */

/* Styles */
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.others.green,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sheetContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		width: 100,
		height: 130,
		borderRadius: 10,
		backgroundColor: '#f1f1f1',
		alignItems: 'center',
		padding: 10,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	cardTitle: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: '600',
	},
})
