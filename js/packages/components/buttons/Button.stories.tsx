import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { ScrollView, View } from 'react-native'

import { AppDecorator } from '../../../.storybook/preview'
import {
	ErrorButtonIconLeft,
	PrimaryButton,
	SecondaryAltButton,
	SecondaryButton,
	SecondaryButtonIconLeft,
	PrimaryFloatingButton,
	SecondaryButtonIconRight,
	PrimaryAltButton,
	PrimaryButtonIconLeft,
	PrimaryButtonIconRight,
	TertiaryButton,
	TertiaryButtonIconRight,
	ErrorButton,
	ErrorButtonIconRight,
	VerticalButtons,
	SecondaryFloatingButton,
	TertiaryButtonIconLeft,
	TertiaryAltButton,
} from '../buttons'

const Spacer = () => <View style={{ height: 16 }} />

const onPress = () => console.log('onPress')

const PrimaryButtons = () => (
	<>
		<PrimaryButton onPress={onPress}>{'Primary'}</PrimaryButton>
		<Spacer />
		<PrimaryAltButton onPress={onPress}>{'Primary Alt Button'}</PrimaryAltButton>
		<Spacer />
		<PrimaryButtonIconLeft onPress={onPress}>{'Primary Button Icon Left'}</PrimaryButtonIconLeft>
		<Spacer />
		<PrimaryButtonIconRight onPress={onPress}>{'Primary Button Icon Right'}</PrimaryButtonIconRight>
		<Spacer />
	</>
)

const SecondaryButtons = () => (
	<>
		<SecondaryButton onPress={onPress}>{'Secondary'}</SecondaryButton>
		<Spacer />
		<SecondaryAltButton onPress={onPress}>{'Secondary Alt Button'}</SecondaryAltButton>
		<Spacer />
		<SecondaryButtonIconLeft onPress={onPress}>
			{'Secondary Button Icon Left'}
		</SecondaryButtonIconLeft>
		<Spacer />
		<SecondaryButtonIconRight onPress={onPress}>
			{'Secondary Button Icon Right'}
		</SecondaryButtonIconRight>
		<Spacer />
	</>
)

const TertiaryButtons = () => (
	<>
		<TertiaryButton onPress={onPress}>{'Tertiary Button'}</TertiaryButton>
		<Spacer />
		<TertiaryAltButton onPress={onPress}>{'Tertiary Alt Button'}</TertiaryAltButton>
		<Spacer />
		<TertiaryButtonIconLeft onPress={onPress}>
			{'Tertiary Button Icon Right'}
		</TertiaryButtonIconLeft>
		<Spacer />
		<TertiaryButtonIconRight onPress={onPress}>
			{'Tertiary Button Icon Right'}
		</TertiaryButtonIconRight>
		<Spacer />
	</>
)

const ErrorButtons = () => (
	<>
		<ErrorButton onPress={onPress}>{'Error Button'}</ErrorButton>
		<Spacer />
		<ErrorButtonIconLeft onPress={onPress}>{'Error Button Icon Left'}</ErrorButtonIconLeft>
		<Spacer />
		<ErrorButtonIconRight onPress={onPress}>{'Error Button Icon Left'}</ErrorButtonIconRight>
		<Spacer />
	</>
)

const FloatingButtons = () => (
	<>
		<PrimaryFloatingButton onPress={onPress} />
		<View style={{ marginRight: 60, marginTop: 120 }}>
			<SecondaryFloatingButton onPress={onPress} />
		</View>
	</>
)

storiesOf('Button', module)
	.addDecorator(AppDecorator)
	.addDecorator((getStory, context) => (
		<ScrollView style={{ padding: 16, height: '100%' }}>{getStory(context)}</ScrollView>
	))
	.add('Buttons', () => (
		<>
			<PrimaryButtons />
			<Spacer />

			<SecondaryButtons />
			<Spacer />

			<TertiaryButtons />
			<Spacer />

			<ErrorButtons />
			<Spacer />

			<VerticalButtons
				children={['Vertical Buttons 1', 'Vertical Buttons 2']}
				onPressTop={onPress}
				onPressBottom={onPress}
			/>

			<FloatingButtons />
		</>
	))
	.add('Primary', () => <PrimaryButtons />)
	.add('Secondary', () => <SecondaryButtons />)
	.add('Tertiary', () => <TertiaryButtons />)
	.add('Error', () => <ErrorButtons />)
	.add('Floating', () => <FloatingButtons />)
