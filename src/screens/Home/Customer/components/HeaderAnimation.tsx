/* Imports */
import React from 'react'
import { Animated } from 'react-native'

/* Relative Imports */
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import { useAnimatedStyle, interpolate } from 'react-native-reanimated'

/* Local Imports */
import HomeHeader from './HomeHeader'
import { CustomBottomSheetRef } from 'src/components/BottomSheet'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
interface PropsHeaderAnimation {
	showNotice: () => void
	bottomSheetRef: React.RefObject<CustomBottomSheetRef>
}

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the HeaderAnimation.
 *
 * @component
 */
const HeaderAnimation: React.FC<PropsHeaderAnimation> = ({
	showNotice,
	bottomSheetRef,
}) => {
	/* Hooks */
	const { scrollY } = useCollapsibleContext()
	const headerAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, 120], [1, 0])
		return { opacity }
	})

	/* Output */
	return (
		<Animated.View style={headerAnimatedStyle}>
			<HomeHeader showNotice={showNotice} bottomSheetRef={bottomSheetRef} />
		</Animated.View>
	)
}

export default HeaderAnimation
