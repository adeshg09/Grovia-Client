/* Imports */
import { PixelRatio } from 'react-native'

/* Local Imports */
import { refWidthCalc } from './dimensions'

// --------------------------------------------------------------------------------------------------

const URBANIST_REGULAR = 'Urbanist-Regular'
const URBANIST_MEDIUM = 'Urbanist-Medium'
const URBANIST_SEMIBOLD = 'Urbanist-SemiBold'
const URBANIST_BOLD = 'Urbanist-Bold'

// --------------------------------------------------------------------------------------------------

/**
 * @description This is font family object, fonts are as per Figma design
 */
const fontFamily = {
	regular: URBANIST_REGULAR,
	medium: URBANIST_MEDIUM,
	semiBold: URBANIST_SEMIBOLD,
	bold: 'Urbanist-Bold',
}

const scale = refWidthCalc

const scaleText = (size: number) => {
	const newSize = size * scale
	return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const getLineHeight = (fontSize: number, percent: number) =>
	fontSize * (percent / 100)

export { fontFamily, scaleText, getLineHeight }
