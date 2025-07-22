/* Relative Imports */
import changeNavigationBarColor from 'react-native-navigation-bar-color'

/* Local Imports */
import { ThemeType } from '../context/ThemeContext'
import { scaleText, getLineHeight } from '../static/fonts'

// -------------------------------------------------------------------------------------------------------------------------
export const changeNavigationColor = async (color: string) => {
	try {
		const response = await changeNavigationBarColor(color)
	} catch (e) {
		console.log(e)
	}
}

export const getThemeColor = (
	theme: ThemeType,
	lightModeColor: string,
	darkModeColor: string,
) => {
	return theme === 'light' ? lightModeColor : darkModeColor
}

export const createTextStyle = (
	fontFamily: any,
	fontSize: number,
	lineHeightPercentage: number = 140,
	letterSpacing: number = 0.2,
) => ({
	fontFamily: fontFamily,
	fontSize: scaleText(fontSize),
	lineHeight: scaleText(getLineHeight(fontSize, lineHeightPercentage)),
	letterSpacing: letterSpacing,
})

export const hexToRGB = (hex: string): [number, number, number] => {
	const cleanHex = hex.replace('#', '')
	const bigint = parseInt(cleanHex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return [r, g, b]
}
