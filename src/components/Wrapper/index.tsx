import React from 'react'
import {
	View,
	StatusBar,
	StatusBarStyle,
	Platform,
	StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../static/colors'
import LinearGradient from 'react-native-linear-gradient'

type WrapperProps = {
	children: React.ReactNode
	statusBarColor?: string
	statusBarStyle?: StatusBarStyle
	useGradient?: boolean
	gradientColors?: string[]
}

const Wrapper: React.FC<WrapperProps> = ({
	children,
	statusBarColor,
	statusBarStyle = 'dark-content',
	useGradient = false,
	gradientColors,
}) => {
	const backgroundColor = statusBarColor ?? colors.others.white
	const gradientBackgroundColor = gradientColors ?? colors.gradient.green

	const content = (
		<>
			<StatusBar
				barStyle={statusBarStyle}
				backgroundColor={backgroundColor}
				translucent={false}
			/>
			<View style={{ flex: 1 }}>{children}</View>
		</>
	)

	return useGradient ? (
		<LinearGradient colors={gradientBackgroundColor} style={{ flex: 1 }}>
			<SafeAreaView
				style={{ flex: 1 }}
				edges={['top', 'bottom', 'left', 'right']}>
				{content}
			</SafeAreaView>
		</LinearGradient>
	) : (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: backgroundColor }}
			edges={['top', 'bottom', 'left', 'right']} // Safe area on all sides
		>
			{content}
		</SafeAreaView>
	)
}

export default Wrapper
