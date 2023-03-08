import React from 'react'
import { AppDimensionsProvider } from '@berty/contexts/app-dimensions.context'
import { StyleProvider } from '@berty/contexts/styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { IconRegistry } from '@ui-kitten/components'
import reduxStore from '@berty/redux/store'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { FeatherIconsPack } from '../packages/messenger-app/feather-icons'
import { CustomIconsPack } from '../packages/messenger-app/custom-icons'

export const decorators = []
export const parameters = {}

export const AppDecorator = (getStory, context) => (
	<SafeAreaProvider>
		<AppDimensionsProvider>
			<StyleProvider>
				<ReduxProvider store={reduxStore}>
					<IconRegistry icons={[EvaIconsPack, FeatherIconsPack, CustomIconsPack]} />
					{getStory(context)}
				</ReduxProvider>
			</StyleProvider>
		</AppDimensionsProvider>
	</SafeAreaProvider>
)
