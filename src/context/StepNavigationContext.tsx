import React, { createContext, useContext, useState } from 'react'

/**
 * Context for triggering "Next" button logic in the active substep
 */
type StepNavContextType = {
	onNextPress?: () => void
	setOnNextPress: (fn: () => void) => void
}

const StepNavContext = createContext<StepNavContextType>({
	onNextPress: undefined,
	setOnNextPress: () => {},
})

export const useStepNav = () => useContext(StepNavContext)

export const StepNavProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [onNextPress, setOnNextPress] = useState<() => void>()

	return (
		<StepNavContext.Provider value={{ onNextPress, setOnNextPress }}>
			{children}
		</StepNavContext.Provider>
	)
}
