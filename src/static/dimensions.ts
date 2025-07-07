/* Imports */
import { Dimensions } from 'react-native'

/* Constants */
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const refWidth = 428
export const refHeight = 926

export const refWidthCalc = windowWidth / refWidth
export const refHeightCalc = windowHeight / refHeight
