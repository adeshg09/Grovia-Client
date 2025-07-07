import { StyleSheet } from 'react-native'
import { refWidthCalc, refHeightCalc } from '../../../../static/dimensions'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		paddingHorizontal: 24 * refWidthCalc,
		paddingVertical: 16 * refHeightCalc,
		gap: 12 * refHeightCalc,
		borderBottomLeftRadius: 40 * refWidthCalc,
		borderBottomRightRadius: 40 * refWidthCalc,
	},
	stepCardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 24 * refHeightCalc,
		paddingHorizontal: 24 * refWidthCalc,
		borderRadius: 12 * refWidthCalc,
		gap: 20 * refWidthCalc,
		boxShadow: '0px 4px 60px 0px rgba(4, 6, 15, 0.05)',
	},
})
