import { storiesOf } from '@storybook/react-native'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import {
	MediumInput,
	MediumClearableInput,
	LargeInputWithIcon,
	LargeInput,
	SmallInput,
	SmallClearableInput,
} from '.'
import { AppDecorator } from '../../../.storybook/preview'

const Spacer = () => <View style={{ height: 16 }} />

const MediumInputs = () => {
	const [searchText, setSearchText] = useState('')
	return (
		<>
			<Text>Medium Input:</Text>
			<Spacer />
			<MediumInput
				value={searchText}
				onChangeText={setSearchText}
				placeholder={'placeholder'}
				iconName='search-outline'
			/>
			<Spacer />
		</>
	)
}
const MediumClearableInputs = () => {
	const [searchText, setSearchText] = useState('')
	return (
		<>
			<Text>Medium Clearable Input:</Text>
			<Spacer />
			<MediumClearableInput
				value={searchText}
				onChangeText={setSearchText}
				placeholder={'placeholder'}
				iconName='search-outline'
			/>
			<Spacer />
		</>
	)
}
const LargeInputWithIcons = () => {
	const [searchText, setSearchText] = useState('')
	return (
		<>
			<Text>Large Input With Icon:</Text>
			<Spacer />
			<LargeInputWithIcon
				value={searchText}
				onChangeText={setSearchText}
				placeholder={'placeholder'}
				iconName='search-outline'
			/>
			<Spacer />
		</>
	)
}
const LargeInputs = () => {
	const [searchText, setSearchText] = useState('')
	return (
		<>
			<Text>Large Inputs:</Text>
			<Spacer />
			<LargeInput value={searchText} onChangeText={setSearchText} placeholder={'placeholder'} />
			<Spacer />
		</>
	)
}
const SmallInputs = () => {
	const [searchText, setSearchText] = useState('')
	return (
		<>
			<Text>Small Inputs:</Text>
			<Spacer />
			<SmallInput value={searchText} onChangeText={setSearchText} placeholder={'placeholder'} />
			<Spacer />
		</>
	)
}
const SmallClearableInputs = () => {
	const [searchText, setSearchText] = useState('')
	return (
		<>
			<Text>Small Clearable Inputs:</Text>
			<Spacer />
			<SmallClearableInput
				value={searchText}
				onChangeText={setSearchText}
				placeholder={'placeholder'}
				iconName='search-outline'
			/>
			<Spacer />
		</>
	)
}

storiesOf('Inputs', module)
	.addDecorator(AppDecorator)
	.addDecorator((getStory, context) => (
		<ScrollView style={{ padding: 16, height: '100%' }}>{getStory(context)}</ScrollView>
	))
	.add('Inputs', () => (
		<>
			<MediumInputs />
			<Spacer />

			<MediumClearableInputs />
			<Spacer />

			<LargeInputWithIcons />
			<Spacer />

			<LargeInputs />
			<Spacer />

			<SmallInputs />
			<Spacer />

			<SmallClearableInputs />
			<Spacer />
		</>
	))
