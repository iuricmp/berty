import { storiesOf } from '@storybook/react-native'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { AltToggle, StreamProgress, TabBar, Toggle } from '.'
import { AppDecorator } from '../../../.storybook/preview'

const Spacer = () => <View style={{ height: 16 }} />

const onPress = () => console.log('onPress')

const Toggles = () => {
	const [toggle1, setToggle1] = useState(true)
	const [toggle2, setToggle2] = useState(false)
	return (
		<>
			<Toggle checked={toggle1} onChange={setToggle1} />
			<Spacer />
			<Toggle checked={toggle2} onChange={setToggle2} />
			<Spacer />
		</>
	)
}

const AltToggles = () => {
	const [toggle1, setToggle1] = useState(true)
	const [toggle2, setToggle2] = useState(false)
	return (
		<>
			<AltToggle checked={toggle1} onChange={setToggle1} />
			<Spacer />
			<AltToggle checked={toggle2} onChange={setToggle2} />
			<Spacer />
		</>
	)
}

const Tabs = () => {
	return (
		<>
			<View>
				<TabBar
					tabs={[
						{ name: 'tab 1 name' },
						{ name: 'info' },
						{ name: 'disabled', buttonDisabled: true },
					]}
					onTabChange={onPress}
				/>
				<View>
					<Text>tab 1 content</Text>
				</View>
			</View>
		</>
	)
}

const ProgressBars = () => {
	return (
		<>
			<StreamProgress />
		</>
	)
}

storiesOf('Controls', module)
	.addDecorator(AppDecorator)
	.addDecorator((getStory, context) => (
		<ScrollView style={{ padding: 16, height: '100%' }}>{getStory(context)}</ScrollView>
	))
	.add('Controls', () => (
		<>
			<Text>Toggles:</Text>
			<Spacer />
			<Toggles />
			<Spacer />

			<Text>AltToggles: </Text>
			<Spacer />
			<AltToggles />
			<Spacer />

			<Text>Progress Bars: </Text>
			<Spacer />
			<ProgressBars />
			<Spacer />

			<Text>Tabs: </Text>
			<Tabs />
		</>
	))
