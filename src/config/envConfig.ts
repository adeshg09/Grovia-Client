/* Local Imports */
import {
	REACT_APP_BASE_URL,
	REACT_APP_TRUECALLER_ANDROID_CLIENT_ID,
	REACT_APP_TRUECALLER_IOS_CLIENT_ID,
} from '@env'

// --------------------------------------------------------------------------------------------------

export const envConfig = {
	base: {
		// baseUrl: 'http://192.168.201.11:8000/api/v1',
		baseUrl:
			REACT_APP_BASE_URL || 'https://api-grovia-gateway.onrender.com/api/v1',
	},
	clientId: {
		truecaller: {
			android:
				REACT_APP_TRUECALLER_ANDROID_CLIENT_ID ||
				'kfjj03rhk5yt_0pvvil41punqpavhj9ucadjl7s_tvw',
			ios: REACT_APP_TRUECALLER_IOS_CLIENT_ID || '0',
		},
	},
}
