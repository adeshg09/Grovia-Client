/* Imports */
import React, { createContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

/* Local Imports */
import { setItem, localStoreKeys, fetchItem } from '../store/local/asyncStore'

// -------------------------------------------------------------------------------------------------------------------------

/* Interfaces */
export type ThemeType = 'light' | 'dark'

export interface ThemeContextType {
	theme: ThemeType
	toggleTheme: () => void
	isThemeReady: boolean
}

// -------------------------------------------------------------------------------------------------------------------------

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'light',
	toggleTheme: () => {},
	isThemeReady: false,
})

// -------------------------------------------------------------------------------------------------------------------------

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	/* States */
	const [theme, setTheme] = useState<ThemeType>('light')
	const [isThemeReady, setIsThemeReady] = useState(false)

	/* Functions */
	const toggleTheme = async () => {
		const newTheme: ThemeType = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		await setItem(localStoreKeys.THEME_MODE, newTheme)
	}

	const initializeTheme = async () => {
		const savedTheme = await fetchItem(localStoreKeys.THEME_MODE)

		if (savedTheme === 'light' || savedTheme === 'dark') {
			setTheme(savedTheme)
		} else {
			const systemTheme = Appearance.getColorScheme()
			setTheme(systemTheme === 'dark' ? 'dark' : 'light')
		}

		setIsThemeReady(true)
	}

	/* Side-Effects */
	useEffect(() => {
		initializeTheme()
	}, [])

	/* Output */
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isThemeReady }}>
			{isThemeReady ? children : null}
		</ThemeContext.Provider>
	)
}
