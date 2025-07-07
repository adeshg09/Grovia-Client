import { StyleSheet } from 'react-native'
import { refWidthCalc, refHeightCalc } from '../../../../static/dimensions'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24 * refWidthCalc,
		paddingVertical: 16 * refHeightCalc,
		gap: 20 * refHeightCalc,
	},
})
