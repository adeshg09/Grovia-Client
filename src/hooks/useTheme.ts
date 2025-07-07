/* Imports */
import { useContext } from 'react'

/* Local Imports */
import { ThemeContext, ThemeContextType } from '../context/ThemeContext'

// -------------------------------------------------------------------------------------------------------------------------

export const useTheme = (): ThemeContextType => {
	/* Hooks */
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	/* Output */
	return context
}
