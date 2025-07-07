/* Imports */
import React from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	StatusBar,
} from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import { AuthStackParamList } from '../../../models/navigation/AuthStackParamList'
import Wrapper from '../../../components/Wrapper'
import colors from '../../../static/colors'
import { getThemeColor } from '../../../utils/helpers'
import { useTheme } from '../../../hooks/useTheme'
import { getTypographyStyles } from '../../../static/gstyles'
import { styles } from './index.styles'
import { SvgIcon } from '../../../assets'
import { refHeightCalc, refWidthCalc } from '../../../static/dimensions'
import LinearGradient from 'react-native-linear-gradient'

// -------------------------------------------------------------------------------------------------------------------------

type PropsAuthWelcome = NativeStackScreenProps<
	AuthStackParamList,
	'AuthWelcome'
>

// -------------------------------------------------------------------------------------------------------------------------

const AuthWelcome: React.FC<PropsAuthWelcome> = ({ navigation }) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Constants */
	const roleSelectionOptions = [
		{
			image: (
				<SvgIcon.Customer
					width={140 * refWidthCalc}
					height={140 * refHeightCalc}
				/>
			),
			role: 'Customer',
			tagline: 'Get fresh groceries delivered to your door',
			bg: colors.gradient.green,
			tagLineColor: colors.secondary[500],
			onPress: () => {
				navigation.navigate('EnterNumber', {
					role: 'customer',
				})
			},
		},
		{
			image: (
				<SvgIcon.Captain
					width={140 * refWidthCalc}
					height={140 * refHeightCalc}
				/>
			),
			role: 'Captain',
			tagline: 'Earn on every delivery. Be the hero of every order',
			bg: colors.gradient.yellow,
			tagLineColor: colors.primary[500],
			onPress: () => {
				navigation.navigate('EnterNumber', {
					role: 'captain',
				})
			},
		},
	]

	/* Output */
	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<ScrollView
				style={[
					styles.container,
					{
						backgroundColor: getThemeColor(
							theme,
							colors.others.white,
							colors.dark.dark1,
						),
					},
				]}
				contentContainerStyle={{
					paddingVertical: 36 * refHeightCalc,
					gap: 32 * refHeightCalc,
				}}
				showsVerticalScrollIndicator={false}>
				{/* Logo */}
				<View style={styles.appLogoContainer}>
					<SvgIcon.AppLogo
						width={140 * refWidthCalc}
						height={140 * refHeightCalc}
					/>
				</View>

				{/* Welcome */}
				<View style={styles.welcomeTextContainer}>
					<Text style={getTypographyStyles(theme).headingH3Bold}>
						Welcome to Grovia
					</Text>
					<Text
						style={{
							...getTypographyStyles(theme).bodyXlargeRegular,
							color: getThemeColor(theme, colors.grey[700], colors.grey[200]),
							textAlign: 'center',
						}}>
						Your modern grocery solution
					</Text>
				</View>

				<View style={styles.divider}>
					<View
						style={{
							backgroundColor: getThemeColor(
								theme,
								colors.grey[300],
								colors.dark.dark3,
							),
							height: 1,
							flex: 1,
						}}
					/>
				</View>

				{/* Instruction */}

				<Text
					style={{
						...getTypographyStyles(theme).bodyLargeRegular,
						color: getThemeColor(theme, colors.grey[600], colors.grey[300]),
						textAlign: 'center',
						marginTop: 4 * refHeightCalc,
					}}>
					Please select a role to begin your journey
				</Text>

				{/* Role Selection */}
				<View style={styles.roleSelectionContainer}>
					{roleSelectionOptions.map((role, index) => (
						<TouchableOpacity
							key={index}
							activeOpacity={0.7}
							style={styles.roleCardContainer}
							onPress={role.onPress}>
							<LinearGradient colors={role.bg} style={styles.roleCardGradient}>
								{role.image}
								<View style={styles.roleCardTextBlock}>
									<Text
										style={{
											...getTypographyStyles(theme).headingH5Bold,
											color: colors.others.white,
										}}>
										{role.role}
									</Text>
									<Text
										style={{
											...getTypographyStyles(theme).bodyLargeRegular,
											color: role.tagLineColor,
											marginTop: 4 * refHeightCalc,
										}}>
										{role.tagline}
									</Text>
								</View>
							</LinearGradient>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</Wrapper>
	)
}

export default AuthWelcome
