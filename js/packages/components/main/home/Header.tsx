import React, { useEffect, useRef, useState } from 'react'
import { Platform, ScrollView, TextInput, TouchableOpacity, View, ViewProps } from 'react-native'
import { useNavigation as useNativeNavigation } from '@react-navigation/core'
import { Translation } from 'react-i18next'
import LottieView from 'lottie-react-native'
import { Icon } from '@ui-kitten/components'

import { useStyles } from '@berty-tech/styles'
import { AccountAvatar } from '@berty-tech/components/avatars'
import { useThemeColor } from '@berty-tech/store/hooks'

export const HomeHeader: React.FC<
	ViewProps & {
		hasRequests: boolean
		scrollRef: React.RefObject<ScrollView>
		isOnTop: boolean
		value: string
		onChange: any
		refresh: boolean
		setRefresh: any
		onLongPress: React.Dispatch<React.SetStateAction<boolean>>
		isMultiAccount: boolean
	}
> = ({
	hasRequests,
	scrollRef,
	onLayout,
	isOnTop,
	value,
	onChange,
	refresh,
	setRefresh,
	onLongPress,
	isMultiAccount,
}) => {
	const [
		{ border, width, height, padding, text, margin, row },
		{ scaleHeight, scaleSize },
	] = useStyles()
	const colors = useThemeColor()
	const { navigate } = useNativeNavigation()
	const [focus, setFocus] = useState<any>(null)
	const animate = useRef<any>(null)

	let paddingTop: any
	if (!value?.length) {
		if (!hasRequests) {
			paddingTop = 40
		} else {
			if (isOnTop) {
				paddingTop = 40
			} else {
				paddingTop = 20
			}
		}
	} else {
		paddingTop = 40
	}

	useEffect(() => {
		if (refresh) {
			setRefresh(false)
			animate.current.play()
		}
	}, [refresh, setRefresh, animate])

	return (
		<View onLayout={onLayout}>
			<Translation>
				{(t: any): React.ReactNode => (
					<View>
						<View
							style={[
								border.radius.top.big,
								padding.horizontal.scale(27),
								{
									backgroundColor: colors['main-background'],
									alignItems: 'center',
									paddingTop: Platform.OS === 'ios' ? paddingTop * scaleHeight : 0,
								},
							]}
						>
							{hasRequests && !isOnTop && !value?.length && (
								<View
									style={[width(42), height(4), { backgroundColor: colors['main-background'] }]}
								/>
							)}
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingVertical: 15,
								}}
							>
								<View
									style={{
										flex: 1,
										alignItems: 'flex-end',
										marginLeft: 5,
									}}
								>
									<TouchableOpacity
										activeOpacity={1}
										onPress={() => {
											animate.current.play()
											scrollRef.current?.scrollTo({ y: 0, animated: true })
										}}
									>
										<LottieView
											ref={animate}
											style={{ width: 40 }}
											source={require('../berty_logo_animated.json')}
											loop={false}
										/>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									style={[
										{
											flex: 12,
											flexDirection: 'row',
											justifyContent: 'flex-start',
											alignItems: 'center',
											backgroundColor: `${colors['secondary-text']}20`,
										},
										padding.vertical.scale(Platform.OS === 'android' ? 0 : 12),
										padding.left.medium,
										margin.left.small,
										margin.right.scale(25),
										border.radius.medium,
									]}
									activeOpacity={1}
									onPress={() => focus?.focus()}
								>
									<View style={[row.center]}>
										<Icon
											name='search-outline'
											fill={colors['secondary-text']}
											width={20 * scaleSize}
											height={20 * scaleSize}
										/>
									</View>

									<View
										style={[
											margin.left.small,
											{
												flex: 6,
												flexDirection: 'row',
												alignItems: 'flex-start',
											},
										]}
									>
										<TextInput
											ref={(ref) => setFocus(ref)}
											placeholder={t('main.home.input-placeholder')}
											placeholderTextColor={`${colors['secondary-text']}90`}
											autoCorrect={false}
											autoCapitalize='none'
											value={value}
											onChangeText={(s: string) => onChange(s)}
											style={[
												{ fontFamily: 'Open Sans', color: colors['secondary-text'] },
												value?.length ? padding.right.scale(25) : padding.right.medium,
												text.size.medium,
											]}
										/>
									</View>
									{value?.length ? (
										<TouchableOpacity
											style={{
												justifyContent: 'center',
												flex: 1,
												flexDirection: 'row',
											}}
											onPress={() => onChange('')}
										>
											<Icon
												name='close-circle-outline'
												fill={colors['secondary-text']}
												width={20 * scaleSize}
												height={20 * scaleSize}
											/>
										</TouchableOpacity>
									) : null}
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
									}}
									onPress={() => {
										if (isMultiAccount) {
											onLongPress(false)
										} else {
											navigate('Settings.Home')
										}
									}}
									onLongPress={() => {
										onLongPress(true)
									}}
								>
									<AccountAvatar size={35} />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</Translation>
		</View>
	)
}
