/* Imports */
import { StyleSheet } from 'react-native'

/* Local Imports */
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import colors from '../../static/colors'

/* Styles */
export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
	},
	image: {
		marginTop: 48 * refHeightCalc,
	},
	contentContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		borderTopLeftRadius: 48 * refWidthCalc,
		borderTopRightRadius: 48 * refWidthCalc,
		boxShadow: '12px 0px 24px 0px #181A201F',
	},
	contentBox: {
		marginTop: 20 * refHeightCalc,
		paddingHorizontal: 24 * refWidthCalc,
		paddingTop: 24 * refHeightCalc,
		paddingBottom: 36 * refHeightCalc,
		gap: 24 * refHeightCalc,
	},
	dotContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8 * refWidthCalc,
	},
	dot: {
		width: 8 * refWidthCalc,
		height: 8 * refWidthCalc,
		borderRadius: 1000 * refWidthCalc,
	},
	activeDot: {
		width: 32 * refWidthCalc,
		height: 8 * refWidthCalc,
		backgroundColor: colors.primary[900],
		borderRadius: 1000 * refWidthCalc,
	},
	backgroundImage: {
		flex: 1,
	},
	backgroundImageOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
})
