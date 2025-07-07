/* Imports */
import React, { useEffect, useState } from 'react'

/* Relative Imports */
import { useAppSelector } from '../../hooks/storeHooks'
import AppCaptainStackNavigation from './AppCaptainStackNavigation'
import AppCustomerStackNavigation from './AppCustomerStackNavigation'

// -----------------------------------------------------------------------------

const AppStackNavigation: React.FC = () => {
	const user = useAppSelector(
		state => state.auth?.user as { role?: string } | null,
	)
	const role = user?.role

	/* Output */
	return role === 'customer' ? (
		<AppCustomerStackNavigation />
	) : (
		<AppCaptainStackNavigation />
	)
}

export default AppStackNavigation
