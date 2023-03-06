import { storiesOf } from '@storybook/react-native'
import Long from 'long'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import beapi from '@berty/api'

import { TextualDropdown, MembersDropdown } from '.'
import { AppDecorator } from '../../../.storybook/preview'

const Spacer = () => <View style={{ height: 16 }} />

const members: beapi.messenger.IMember[] = [
	{
		publicKey: '123',
		displayName: 'Jean Dupont',
		conversationPublicKey: '42234',
		isMe: false,
		isCreator: false,
		infoDate: Long.fromNumber(1677688671558),
		conversation: null,
		devices: null,
	},
	{
		publicKey: '124',
		displayName: 'Edson Arantes do Nascimento',
		conversationPublicKey: '234234',
		isMe: true,
		isCreator: false,
		infoDate: Long.fromNumber(1677693673033),
		conversation: null,
		devices: null,
	},
]

const items = [
	{
		label: 'Rio de Janeiro',
		value: '1',
	},
	{ label: 'Lisbon', value: '2' },
	{ label: 'Paris', value: '3' },
]

const TextualDropdowns = () => {
	const [currentValue, setCurrentValue] = useState('Placeholder')
	return (
		<>
			<Text>Textual Dropdown:</Text>
			<Spacer />
			<TextualDropdown
				items={items}
				placeholder={currentValue}
				onChangeItem={e => setCurrentValue(e.label)}
			/>
			<Spacer />
		</>
	)
}

const MembersDropdowns = () => {
	const [currentValue, setCurrentValue] = useState('Placeholder')
	return (
		<>
			<Text>Members Dropdowns (empty):</Text>
			<Spacer />
			<MembersDropdown
				items={[]}
				publicKey={'publicKey'}
				onChangeItem={member => {
					console.log('member' + member)
				}}
				placeholder={'Placehoder'}
			/>
			<Spacer />

			<Text>Members Dropdown (with content):</Text>
			<Spacer />
			<MembersDropdown
				items={members}
				publicKey={'publicKey'}
				onChangeItem={member => {
					console.log('member' + member)
				}}
				placeholder={'Placehoder'}
			/>
		</>
	)
}

storiesOf('Dropdown', module)
	.addDecorator(AppDecorator)
	.addDecorator((getStory, context) => (
		<ScrollView style={{ padding: 16, height: '100%' }}>{getStory(context)}</ScrollView>
	))
	.add('Dropdown', () => (
		<>
			<TextualDropdowns />
			<Spacer />

			<MembersDropdowns />
			<Spacer />
		</>
	))
