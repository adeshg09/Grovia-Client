/* Imports */
import { StyleSheet } from 'react-native'
import { refHeightCalc, refWidthCalc } from '../../../static/dimensions'

/* Styles */
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24 * refWidthCalc,
	},
	appLogoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50 * refHeightCalc,
	},
	welcomeTextContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	roleSelectionContainer: {
		gap: 40 * refHeightCalc,
	},
	roleCardContainer: {
		borderRadius: 16 * refWidthCalc,
		overflow: 'hidden',
		boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
	},
	roleCardGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16 * refHeightCalc,
		paddingHorizontal: 16 * refWidthCalc,
		gap: 16 * refWidthCalc,
	},
	roleCardTextBlock: {
		flex: 1,
	},
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})
