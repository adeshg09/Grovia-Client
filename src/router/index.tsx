/* Imports */
import React, { useEffect, useState } from 'react'

/* Relative Imports */
import { NavigationContainer } from '@react-navigation/native'
import { hideNavigationBar } from 'react-native-navigation-bar-color'
import RNBootSplash from 'react-native-bootsplash'

/* Local Imports */
import { useTheme } from '../hooks/useTheme'
import AppStackNavigation from './AppStackNavigation'
import AuthStackNavigation from './AuthStackNavigation'
import { navigationRef } from '../utils/navigation'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { fetchItem, localStoreKeys, setItem } from '../store/local/asyncStore'
import { authSliceActions } from '../store/authSlice'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import RegistrationStackNavigation from './RegistrationStackNavigation'

// -----------------------------------------------------------------------------

/* Components */
const Router = () => {
	/* Hooks */
	const dispatch = useAppDispatch()
	const { toggleTheme } = useTheme()
	const isLoggedIn = useAppSelector(store => store.auth.loggedIn)
	const isRegisted = useAppSelector(store => store.auth.isRegisted)

	/* Constants */
	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onEnd(() => {
			runOnJS(toggleTheme)()
		})

	/* States */
	const [isAppReady, setIsAppReady] = useState(false)

	/* Functions */
	const getUser = async () => {
		const user: any = (await fetchItem(localStoreKeys.USER_DATA)) ?? {}
		const userAccessToken: any =
			(await fetchItem(localStoreKeys.USER_ACCESS_TOKEN)) ?? ''
		const userRefreshToken: any =
			(await fetchItem(localStoreKeys.USER_REFRESH_TOKEN)) ?? ''
		const isRegisted = (await fetchItem(localStoreKeys.IS_REGISTED)) ?? false
		const isLoggedIn = (await fetchItem(localStoreKeys.LOGGED_IN)) ?? false

		console.log('userAccessToken', userAccessToken)
		console.log('userRefreshToken', userRefreshToken)
		console.log('user', user)
		console.log('isRegisted', isRegisted)
		console.log('isLoggedIn', isLoggedIn)

		if (userAccessToken && user) {
			// const userDetails = await getUserProfile()
			// console.log('userDetails', userDetails)
			// await setItem(localStoreKeys.USER_DATA, userDetails?.data?.userProfile)

			dispatch(
				authSliceActions.setTokens({
					accessToken: userAccessToken,
					refreshToken: userRefreshToken,
				}),
			)

			dispatch(authSliceActions.setUser(user))

			await setItem(localStoreKeys.LOGGED_IN, true)
			dispatch(authSliceActions.setLoggedIn(true))

			// if (userDetails?.data?.userProfile?.isActivated) {
			// 	await setItem(localStoreKeys.IS_REGISTED, true)
			// 	dispatch(authSliceActions.setIsRegisted(true))
			// } else {
			// 	await setItem(localStoreKeys.IS_REGISTED, false)
			// 	dispatch(authSliceActions.setIsRegisted(false))
			// }
			if (user?.isActivated) {
				await setItem(localStoreKeys.IS_REGISTED, true)
				dispatch(authSliceActions.setIsRegisted(true))
			} else {
				await setItem(localStoreKeys.IS_REGISTED, false)
				dispatch(authSliceActions.setIsRegisted(false))
			}

			console.log('userAccessToken', userAccessToken)
			console.log('userRefreshToken', userRefreshToken)
			console.log('user', user)
			console.log('isRegisted', isRegisted)
			console.log('isLoggedIn', isLoggedIn)
		} else {
			await setItem(localStoreKeys.LOGGED_IN, false)
			dispatch(authSliceActions.setLoggedIn(false))
		}
	}

	const initializeApp = async () => {
		await getUser()
		hideNavigationBar()
	}

	/* Side-Effects */
	useEffect(() => {
		// changeNavigationColor(
		// 	getThemeColor(theme, colors.others.white, colors.dark.dark1),
		// )
		console.log('redux isLoggedIn', isLoggedIn)
		console.log('redux isRegisted', isRegisted)
		initializeApp().finally(() => {
			setIsAppReady(true)
			RNBootSplash.hide({ fade: true }) //  hide when app ready
		})
	}, [])

	/* Output */
	return (
		<GestureDetector gesture={doubleTap}>
			<NavigationContainer ref={navigationRef}>
				{isLoggedIn ? (
					isRegisted ? (
						<AppStackNavigation />
					) : (
						<RegistrationStackNavigation />
					)
				) : (
					<AuthStackNavigation />
				)}
			</NavigationContainer>
		</GestureDetector>
	)
}

export default Router
