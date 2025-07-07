import { StyleSheet } from 'react-native'
import { refHeightCalc } from '../../../../static/dimensions'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	illustrationContainer: {
		marginBottom: 32 * refHeightCalc,
	},
})
