/* Imports */
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'

/* Relative Imports */

/* Local Imports */
import Notice from './Notice'
import { useTheme } from '../../../../hooks/useTheme'
import { getThemeColor } from '../../../../utils/helpers'
import colors from '../../../../static/colors'
// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsNoticeAnimation {
	noticePosition: any
	noticeHeight: number
	children: React.ReactNode
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the NoticeAnimation.
 *
 * @component
 */
const NoticeAnimation: React.FC<PropsNoticeAnimation> = ({
	noticePosition,
	noticeHeight,
	children,
}) => {
	/* Hooks */
	const { theme } = useTheme()

	/* Output */
	return (
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
			<Animated.View
				style={[
					styles.noticeContainer,
					{ transform: [{ translateY: noticePosition }] },
				]}>
				<Notice noticeHeight={noticeHeight} />
			</Animated.View>
			<Animated.View
				style={[
					styles.contentContainer,
					{
						paddingTop: noticePosition.interpolate({
							inputRange: [-noticeHeight, 0],
							outputRange: [0, noticeHeight + 20],
						}),
					},
				]}>
				{children}
			</Animated.View>
		</View>
		// <FullScreenLoader sourceKey="global" />
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noticeContainer: {
		width: '100%',
		position: 'absolute',
		zIndex: 999,
	},
	contentContainer: {
		flex: 1,
		width: '100%',
		// backgroundColor:'red'
	},
})

export default NoticeAnimation
