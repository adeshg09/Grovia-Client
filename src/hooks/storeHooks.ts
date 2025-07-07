/* Relative Imports */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

/* Local Imports */
import type { RootState, AppDispatch } from '../store/store'

// --------------------------------------------------------------------------------------------------

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
