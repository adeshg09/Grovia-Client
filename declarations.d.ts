declare module '*.svg' {
	import React from 'react'
	import { SvgProps } from 'react-native-svg'
	const content: React.FC<SvgProps>
	export default content
}

declare module 'react-native-vector-icons'

declare module 'react-native-rolling-bar' {
	import { ReactNode } from 'react'
	interface Props {
		children?: ReactNode
		interval?: number
		defaultStyle?: boolean
		customStyle?: object
		animationDuration?: number
		delayBetween?: number
		forceRoll?: boolean
	}
	const RollingBar: React.FC<Props>
	export default RollingBar
}
