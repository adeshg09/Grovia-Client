/* Imports */
import React, { useEffect, useRef } from 'react'
import { Platform, Animated as RNAnimated } from 'react-native'

/* Relative Imports */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
	CollapsibleContainer,
	CollapsibleHeaderContainer,
	CollapsibleScrollView,
	useCollapsibleContext,
	withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible'

/* Local Imports */
import { AppStackParamList } from '../../../models/navigation/AppStackParamList'
import { useTheme } from '../../../hooks/useTheme'
import NoticeAnimation from './components/NoticeAnimation'
import { refHeightCalc, windowHeight } from '../../../static/dimensions'
import AnimatedHeader from './components/HeaderAnimation'
import StickySearchBar from './components/StickySearchBar'
import HomeContent from './components/HomeContent'
import { CustomBottomSheetRef } from '../../../components/BottomSheet'
import LocationBottomSheet from './components/LocationBottomSheet'
import BackToTopButton from './components/BackToTopButton'
import Visuals from './components/Visuals'

// -------------------------------------------------------------------------------------------------------------------------

/* Interface */
type PropsCustomerHome = NativeStackScreenProps<
	AppStackParamList,
	'CustomerHome'
>

// -------------------------------------------------------------------------------------------------------------------------

/**
 * Component to create the CustomerHome Screen.
 *
 * @component
 */
const CustomerHome: React.FC<PropsCustomerHome> = ({ navigation }) => {
	/* Constants */
	const noticeHeight =
		(Platform.OS === 'ios' ? windowHeight * 0.12 : windowHeight * 0.1) + 12

	/* Hooks */
	const { theme } = useTheme()
	const noticePosition = useRef(new RNAnimated.Value(-noticeHeight)).current
	const bottomSheetRef = useRef<CustomBottomSheetRef>(null)
	const insets = useSafeAreaInsets()
	const { scrollY, expand } = useCollapsibleContext()
	const previousScroll = useSharedValue(0)
	const isScrollingUp = useDerivedValue(() => {
		const scrollingUp =
			scrollY.value < previousScroll.value && scrollY.value > 180
		previousScroll.value = scrollY.value
		return scrollingUp
	})
	const backToTopStyle = useAnimatedStyle(() => {
		const visible = isScrollingUp.value
		return {
			opacity: withTiming(visible ? 1 : 0, { duration: 300 }),
			transform: [
				{
					translateY: withTiming(visible ? 0 : 10, { duration: 300 }),
				},
			],
		}
	})

	/* Functions */
	const handleSlideUp = () => {
		RNAnimated.timing(noticePosition, {
			toValue: -noticeHeight,
			duration: 300,
			useNativeDriver: false,
		}).start()
	}

	const handleSlideDown = () => {
		RNAnimated.timing(noticePosition, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false,
		}).start()
	}

	const handleShowNotice = () => {
		handleSlideDown()
		const timeoutId = setTimeout(() => {
			handleSlideUp()
		}, 3500)
		return () => clearTimeout(timeoutId)
	}

	/* Side-Effects */
	useEffect(() => {
		handleShowNotice()
	}, [])

	/* Output */
	return (
		<NoticeAnimation
			noticePosition={noticePosition}
			noticeHeight={noticeHeight}>
			<>
				{/* <Visuals /> */}
				{/* <SafeAreaView /> */}

				<BackToTopButton
					scrollY={scrollY}
					backToTopStyle={backToTopStyle}
					expand={expand}
				/>

				<CollapsibleContainer
					style={{
						flex: 1,
						marginTop: insets.top || 20 * refHeightCalc,
					}}>
					<CollapsibleHeaderContainer
						containerStyle={{
							backgroundColor: 'transparent',
						}}>
						<AnimatedHeader
							showNotice={handleShowNotice}
							bottomSheetRef={bottomSheetRef}
						/>
						<StickySearchBar />
					</CollapsibleHeaderContainer>

					<CollapsibleScrollView
						nestedScrollEnabled
						style={{
							flex: 1,
						}}
						showsVerticalScrollIndicator={false}>
						<HomeContent navigation={navigation} />
					</CollapsibleScrollView>
				</CollapsibleContainer>

				<LocationBottomSheet bottomSheetRef={bottomSheetRef} />
			</>
		</NoticeAnimation>
	)
}

export default withCollapsibleContext(CustomerHome)
