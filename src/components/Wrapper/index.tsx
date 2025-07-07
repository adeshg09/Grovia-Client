import React from 'react'
import { View, StatusBar, StatusBarStyle, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../static/colors'

type WrapperProps = {
	children: React.ReactNode
	statusBarColor?: string
	statusBarStyle?: StatusBarStyle
}

const Wrapper: React.FC<WrapperProps> = ({
	children,
	statusBarColor,
	statusBarStyle = 'dark-content',
}) => {
	const backgroundColor = statusBarColor ?? colors.others.white

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor }}
			edges={['top', 'bottom', 'left', 'right']} // Safe area on all sides
		>
			<StatusBar
				barStyle={statusBarStyle}
				backgroundColor={backgroundColor}
				translucent={false} // Use true only if you’re managing layout manually
			/>
			<View style={{ flex: 1 }}>{children}</View>
		</SafeAreaView>
	)
}

export default Wrapper
