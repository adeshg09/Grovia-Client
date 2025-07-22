/* Imports */
import React, { useEffect } from 'react'

/* Relative Imports */
import { Host } from 'react-native-portalize'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClientProvider } from '@tanstack/react-query'

/* Local Imports */
import Router from './src/router'
import { ThemeProvider } from './src/context/ThemeContext'
import store from './src/store/store'
import { queryClient } from './src/config/queryClientConfig'

// -------------------------------------------------------------------------------------------------------------------------

/* Components */
const App = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Host>
				<ThemeProvider>
					<QueryClientProvider client={queryClient}>
						<Provider store={store}>
							<Router />
						</Provider>
					</QueryClientProvider>
				</ThemeProvider>
			</Host>
		</GestureHandlerRootView>
	)
}

export default App
