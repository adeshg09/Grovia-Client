/* Imports */
import React from 'react'
import { StyleSheet, View, Animated, StatusBar } from 'react-native'

/* Relative Imports */
import {
	StickyView,
	useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible'
import { useAnimatedStyle, interpolate } from 'react-native-reanimated'

/* Local Imports */
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor, hexToRGB } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
import { refWidthCalc } from '../../../../static/dimensions'
import SearchBar from './SearchBar'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsStickySearchBar {}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the StickySearchBar.
 *
 * @component
 */
const StickySearchBar: React.FC<PropsStickySearchBar> = () => {
	/* Hooks */
	const { theme } = useTheme()
	const { scrollY } = useCollapsibleContext()
	const animatedShadow = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, 140], [0, 1])
		return { opacity }
	})
	const baseColor = getThemeColor(theme, colors.others.white, colors.dark.dark1)
	const [r, g, b] = hexToRGB(baseColor)

	const backgroundColorChanges = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [1, 80], [0, 1])
		return {
			backgroundColor: `rgba(${r},${g},${b},${opacity})`,
		}
	})

	/* Output */
	return (
		<StickyView style={[backgroundColorChanges]}>
			<SearchBar />
			<Animated.View style={[styles.shadow, animatedShadow]} />
		</StickyView>
	)
}

const styles = StyleSheet.create({
	shadow: {
		height: 15 * refWidthCalc,
		width: '100%',
		// borderBottomWidth: 1 * refWidthCalc,
		// borderBottomColor: colors.grey[100],
	},
})

export default StickySearchBar
