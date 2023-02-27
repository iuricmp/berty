import StorybookUIRoot from '../../../../.storybook'
import React, { useEffect, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NativeModules, Platform, View } from 'react-native'

import { CreateGroupFooterWithIcon, MenuToggle, ItemSection } from '@berty/components'
import { LoaderDots } from '@berty/components/LoaderDots'
import { UnifiedText } from '@berty/components/shared-components/UnifiedText'
import { StatusBarPrimary } from '@berty/components/StatusBarPrimary'
import { useStyles } from '@berty/contexts/styles'
import { ScreenFC } from '@berty/navigation'
import {
	AsyncStorageKeys,
	NodeInfos,
	NodeInfosDefault,
	storeData,
	getData,
} from '@berty/utils/async-storage/async-storage'
import * as testIDs from '@berty/utils/testing/testIDs.json'

import { LabelInput } from './components/LabelInput'

export const SelectNode: ScreenFC<'Account.SelectNode'> = ({ route }) => {
	// `action` is the action to do when the form is validated. This action can failed we must test the result.
	// `init` is true when the screen is showed at the start of the app. In DevTools, `init` is false.
	return (
		<>
			<StorybookUIRoot />
		</>
	)
}
