/* Imports */
import React, { useEffect, useState } from 'react'

/* Relative Imports */
import { useAppSelector } from '../../hooks/storeHooks'
import RegistrationCustomerStackNavigation from './RegistrationCustomerStackNavigation'
import RegistrationCaptainStackNavigation from './RegistrationCaptainStackNavigation'

// -----------------------------------------------------------------------------

const RegistrationStackNavigation: React.FC = () => {
	const user = useAppSelector(
		state => state.auth?.user as { role?: string } | null,
	)
	const role = user?.role

	/* Output */
	return role === 'customer' ? (
		<RegistrationCustomerStackNavigation />
	) : (
		<RegistrationCaptainStackNavigation />
	)
}

export default RegistrationStackNavigation
