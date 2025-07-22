/* Imports */
import React from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'

/* Relative Imports */

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from 'src/models/navigation/AppStackParamList'
import Wrapper from '../../../../components/Wrapper'
import { SvgIcon } from '../../../../assets'
import { refWidthCalc, refHeightCalc } from '../../../../static/dimensions'
import Header from '../../../../components/Header/Header'
import { homebannerCarousalData } from '../../../../constants/data'
import ScalePress from '../../../../components/Buttons/ScalePress'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
type PropsSpecialOffersViewAll = NativeStackScreenProps<
	AppStackParamList,
	'SpecialOffersViewAll'
>

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the All Special Offers Listing Screen.
 *
 * @component
 */
const SpecialOffersViewAll: React.FC<PropsSpecialOffersViewAll> = ({
	navigation,
}) => {
	/* Constants */
	const headerTitle = 'Special Offers'

	/* Hooks */
	const { theme } = useTheme()

	/* Functions */
	const onPressGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack()
		}
	}

	/* Output */
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
				<Header
					label={headerTitle}
					containerStyle={{
						borderBottomWidth: 1,
						borderBottomColor: getThemeColor(
							theme,
							colors.grey[100],
							colors.dark.dark2,
						),
						paddingHorizontal: 24 * refWidthCalc,
						paddingVertical: 16 * refHeightCalc,
						gap: 12 * refHeightCalc,
					}}
					leftIcon={
						<SvgIcon.ArrowLeft
							width={28 * refWidthCalc}
							height={28 * refHeightCalc}
							color={getThemeColor(theme, colors.grey[400], colors.grey[600])}
						/>
					}
					onPressLeft={onPressGoBack}
					rightIcon={
						<SvgIcon.Search
							width={28 * refWidthCalc}
							height={28 * refHeightCalc}
							color={getThemeColor(theme, colors.grey[400], colors.grey[600])}
						/>
					}
				/>
				{homebannerCarousalData?.length ? (
					<FlatList
						data={homebannerCarousalData}
						keyExtractor={(item, index) => index.toString()}
						contentContainerStyle={[
							{
								paddingHorizontal: 24 * refWidthCalc,
								paddingVertical: 16 * refHeightCalc,
							},
							// contentContainerStyle,
						]}
						ItemSeparatorComponent={() => (
							<View style={{ height: 16 * refHeightCalc }} />
						)}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }: any) => {
							return (
								<ScalePress style={styles.imageContainer}>
									<Image source={item} style={styles.img} />
								</ScalePress>
							)
						}}
					/>
				) : null}
			</View>
		</Wrapper>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: {
		width: '100%',
		height: 190 * refHeightCalc,
		overflow: 'hidden',
		borderRadius: 20 * refWidthCalc,
	},
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
})

export default SpecialOffersViewAll
