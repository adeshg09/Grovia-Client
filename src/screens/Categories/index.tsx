/* Imports */
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'

/* Local Imports */
import Wrapper from '../../components/Wrapper'
import { useTheme } from '../../hooks/useTheme'
import colors from '../../static/colors'
import { getThemeColor } from '../../utils/helpers'
import { refHeightCalc, refWidthCalc } from '../../static/dimensions'
import { AppStackParamList } from '../../models/navigation/AppStackParamList'
import { styles } from './index.styles'
import Header from '../../components/Header/Header'
import { mainCategoriesData } from '../../constants/data'
import CategoriesSectionItem from './components/CategoriesSectionItem'
import { getTypographyStyles } from '../../static/gstyles'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
type PropsCategories = NativeStackScreenProps<AppStackParamList, 'CustomerHome'>

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the Categories Screen.
 *
 * @component
 */
const Categories: React.FC<PropsCategories> = ({ navigation }) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Output */
	return (
		<Wrapper
			statusBarColor={getThemeColor(
				theme,
				colors.others.white,
				colors.dark.dark1,
			)}
			statusBarStyle={theme === 'dark' ? 'light-content' : 'dark-content'}>
			<Header
				label="All Categories"
				containerStyle={{
					borderBottomWidth: 1,
					borderBottomColor: getThemeColor(
						theme,
						colors.grey[100],
						colors.dark.dark2,
					),
				}}
			/>
			<ScrollView
				style={[styles.container]}
				contentContainerStyle={{
					paddingHorizontal: 24 * refWidthCalc,
					paddingTop: 16 * refHeightCalc,
					paddingBottom: 200 * refHeightCalc,
					gap: 24 * refHeightCalc,
				}}
				showsVerticalScrollIndicator={false}>
				<>
					{mainCategoriesData.map((mainCategoryItem, index) => (
						<CategoriesSectionItem
							key={index}
							title={mainCategoryItem.title}
							data={mainCategoryItem.subCategories}
						/>
					))}

					<View
						style={{
							// backgroundColor: getThemeColor(
							// 	theme,
							// 	colors.transparent.green,
							// 	colors.dark.dark2,
							// ),
							gap: 24 * refHeightCalc,
							// marginHorizontal: -24 * refWidthCalc,
							marginVertical: -24 * refWidthCalc,
							// paddingHorizontal: 24 * refWidthCalc,
							paddingVertical: 24 * refHeightCalc,
							borderRadius: 24 * refWidthCalc,
						}}>
						<Text
							style={{
								...getTypographyStyles(theme).headingH1Bold,
								color: getThemeColor(
									theme,
									colors.grey[300],
									colors.dark.dark3,
								),
							}}>
							Ab kirana milega mobile pe bhi! 📱
						</Text>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
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
						<Text
							style={{
								...getTypographyStyles(theme).headingH5Bold,
								color: getThemeColor(
									theme,
									colors.grey[300],
									colors.dark.dark3,
								),
							}}>
							Grovia – Apne mohalla ki trusted dukaan
						</Text>
					</View>
				</>
			</ScrollView>
		</Wrapper>
	)
}

export default Categories
