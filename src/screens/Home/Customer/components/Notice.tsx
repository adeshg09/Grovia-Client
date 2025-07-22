/* Imports */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

/* Relative Imports */
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, G, Path, Use } from 'react-native-svg'

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getTypographyStyles } from '../../../../static/gstyles'
import { wavyData } from '../../../../constants/data'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import colors from '../../../../static/colors'
import { getThemeColor } from '../../../../utils/helpers'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsNotice {
	noticeHeight: number
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Notice.
 *
 * @component
 */
const Notice: React.FC<PropsNotice> = ({ noticeHeight }) => {
	/* Constants */

	/* Hooks */
	const { theme } = useTheme()
	const insets = useSafeAreaInsets()

	/* Output */
	return (
		<View style={{ height: noticeHeight }}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.primary[500],
							colors.secondary[500],
						),
					},
				]}>
				<View
					style={[
						styles.noticeContainer,
						{
							backgroundColor: getThemeColor(
								theme,
								colors.primary[500],
								colors.secondary[500],
							),
						},
					]}>
					<SafeAreaView
						style={{
							padding: 8 * refWidthCalc,
							// marginTop: insets.top || 20 * refHeightCalc,
						}}>
						<Text
							style={[
								getTypographyStyles(theme).bodyMediumSemiBold,
								{
									textAlign: 'center',
									color: getThemeColor(
										theme,
										colors.secondary[500],
										colors.primary[500],
									),
								},
							]}>
							It's raining near this location
						</Text>
						<Text
							style={[
								getTypographyStyles(theme).bodyMediumBold,
								{
									textAlign: 'center',
									color: getThemeColor(
										theme,
										colors.secondary[500],
										colors.primary[500],
									),
								},
							]}>
							Our delivery partners may take longer to reach you
						</Text>
					</SafeAreaView>
				</View>
			</View>

			<Svg
				width="100%"
				height="35"
				fill={getThemeColor(theme, colors.primary[500], colors.secondary[500])}
				viewBox="0 0 4000 1000"
				preserveAspectRatio="none"
				style={styles.wave}>
				<Defs>
					<Path id="wavepath" d={wavyData} />
				</Defs>
				<G>
					<Use href="#wavepath" y="321" />
				</G>
			</Svg>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	noticeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	wave: {
		width: '100%',
		transform: [{ rotateX: '180deg' }],
	},
})

export default Notice
