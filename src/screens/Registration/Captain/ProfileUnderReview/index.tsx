/* Imports */
import React from 'react'
import { Text, View } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import { RegistrationStackParamList } from '../../../../models/navigation/RegistrationStackParamList'
import Wrapper from '../../../../components/Wrapper'
import { useTheme } from '../../../../hooks/useTheme'
import colors from '../../../../static/colors'
import { getTypographyStyles } from '../../../../static/gstyles'
import { getThemeColor } from '../../../../utils/helpers'
import { refHeightCalc, refWidthCalc } from '../../../../static/dimensions'
import { SvgIcon } from '../../../../assets'
import BottomNavigationBar from '../../../../components/BottomTab/BottomNavigationBar'
import { styles } from './index.styles'

/* Interface */
type Props = NativeStackScreenProps<
	RegistrationStackParamList,
	'CaptainProfileUnderReview'
>

/**
 * Component to show Profile Under Review screen.
 *
 * @component
 */
const CaptainProfileUnderReview: React.FC<Props> = ({ navigation, route }) => {
	const { theme } = useTheme()
	console.log('route?.params?', route?.params)
	const reviewMessage = route?.params?.reviewMessage

	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark1,
						),
					},
				]}>
				<View style={styles.illustrationContainer}>
					<SvgIcon.AppLogo
						width={140 * refWidthCalc}
						height={140 * refHeightCalc}
					/>
				</View>
				<Text
					style={[
						getTypographyStyles(theme).headingH4Bold,
						{ textAlign: 'center', marginBottom: 8 * refHeightCalc },
					]}>
					Your profile{'\n'}is under review
				</Text>
				<Text
					style={[
						getTypographyStyles(theme).bodyLargeMedium,
						{
							textAlign: 'center',
							color: getThemeColor(theme, colors.grey[600], colors.grey[300]),
							paddingHorizontal: 40 * refWidthCalc,
						},
					]}>
					Your profile is now under review. You'll be notified once it’s
					approved by the outlet admin.
				</Text>

				{/* <View style={{ flex: 1 }} />
				<BottomNavigationBar
					centerLabel="Continue"
					onCenterPress={() => {
						navigation.goBack()
					}}
				/> */}
			</View>
		</Wrapper>
	)
}

export default CaptainProfileUnderReview
