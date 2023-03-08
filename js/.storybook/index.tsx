import React from 'react'
import { useFonts } from '../packages/messenger-app/fonts-loader'

import StorybookUIRoot from './Storybook'

const App: React.FC = () => {
	const { isFontLoaded } = useFonts()

	if (!isFontLoaded) {
		return null
	}

	return <StorybookUIRoot />
}

export default App
