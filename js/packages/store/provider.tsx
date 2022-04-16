import React, { useCallback, useEffect, useState } from 'react'
import { EventEmitter } from 'events'
import { useSelector } from 'react-redux'

import { useAppDispatch, useAppSelector, useAccount, useConversationsDict } from '@berty/hooks'
import { selectAccountLanguage } from '@berty/redux/reducers/accountSettings.reducer'
import {
	selectAppState,
	selectClearClients,
	selectClient,
	selectEmbedded,
	selectProtocolClient,
	selectSelectedAccount,
	selectDaemonAddress,
} from '@berty/redux/reducers/ui.reducer'
import { selectPersistentOptions } from '@berty/redux/reducers/persistentOptions.reducer'

import { MessengerContext, initialState } from './context'
import {
	initialLaunch,
	openingDaemon,
	openingClients,
	openingListingEvents,
	openingLocalSettings,
	openingCloseConvos,
	closingDaemon,
	deletingStorage,
	updateAccountsPreReady,
	syncAccountLanguage,
} from './providerEffects'
import { restart } from './providerCallbacks'
import { reducer } from './reducer'

export const MessengerProvider: React.FC = ({ children }) => {
	const reduxDispatch = useAppDispatch()
	const [state, dispatch] = React.useReducer(reducer, {
		...initialState,
	})
	const [eventEmitter] = React.useState(new EventEmitter())
	const [handledLink, setHandledLink] = useState<boolean>(false)
	const appState = useSelector(selectAppState)
	const clearClients = useSelector(selectClearClients)
	const protocolClient = useSelector(selectProtocolClient)
	const client = useSelector(selectClient)
	const embedded = useSelector(selectEmbedded)
	const selectedAccount = useSelector(selectSelectedAccount)
	const persistentOptions = useSelector(selectPersistentOptions)
	const daemonAddress = useSelector(selectDaemonAddress)

	useEffect(() => {
		console.log(`State change: ${appState}\n`)
	}, [appState])

	useEffect(() => {
		initialLaunch(dispatch, embedded)
	}, [embedded])

	useEffect(() => {
		openingDaemon(appState, selectedAccount)
	}, [embedded, appState, selectedAccount])

	useEffect(() => {
		openingClients(dispatch, appState, eventEmitter, daemonAddress, embedded, reduxDispatch)
	}, [daemonAddress, embedded, eventEmitter, appState, selectedAccount, reduxDispatch])

	const initialListComplete = useAppSelector(state => state.messenger.initialListComplete)

	useEffect(() => {
		return openingListingEvents(appState, initialListComplete)
	}, [appState, initialListComplete])

	useEffect(() => {
		openingLocalSettings(dispatch, appState, selectedAccount)
	}, [appState, selectedAccount])

	const conversations = useConversationsDict()

	useEffect(() => {
		openingCloseConvos(appState, client, conversations, persistentOptions)
	}, [appState, client, conversations, persistentOptions])

	const accountLanguage = useAppSelector(selectAccountLanguage)
	useEffect(() => {
		syncAccountLanguage(accountLanguage)
	}, [accountLanguage])

	const account = useAccount()

	useEffect(() => {
		updateAccountsPreReady(appState, client, selectedAccount, account, protocolClient, embedded)
	}, [appState, client, selectedAccount, account, protocolClient, embedded, dispatch])

	useEffect(() => {
		return closingDaemon(appState, clearClients, reduxDispatch)
	}, [clearClients, appState, reduxDispatch])

	useEffect(() => {
		return deletingStorage(appState, dispatch, embedded, selectedAccount)
	}, [appState, selectedAccount, embedded])

	const callbackRestart = useCallback(
		() => restart(embedded, selectedAccount, reduxDispatch),
		[selectedAccount, embedded, reduxDispatch],
	)

	const callbackAddNotificationListener = useCallback(
		cb => {
			eventEmitter.addListener('notification', cb)
		},
		[eventEmitter],
	)

	const callbackRemoveNotificationListener = useCallback(
		cb => {
			eventEmitter.removeListener('notification', cb)
		},
		[eventEmitter],
	)

	return (
		<MessengerContext.Provider
			value={{
				...state,
				dispatch,
				addNotificationListener: callbackAddNotificationListener,
				removeNotificationListener: callbackRemoveNotificationListener,
				restart: callbackRestart,
				handledLink,
				setHandledLink,
			}}
		>
			{children}
		</MessengerContext.Provider>
	)
}
