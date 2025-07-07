import React from 'react'
import { ViewStyle } from 'react-native'
import {
	AppleDarkSvg,
	AppleSvg,
	WelcomeBgSvg,
	CustomerSvg,
	CaptainSvg,
	AppLogoSvg,
	DropDownSvg,
	ThreeDotsSvg,
	ArrowLeftSvg,
	ArrowRightSvg,
	FaceBookSvg,
	GoogleSvg,
	TwitterSvg,
	MessageSvg,
	LockSvg,
	UnCheckedSvg,
	CheckedSvg,
	ErrorSvg,
	SuccessSvg,
	CalenderSvg,
	UserSvg,
	PhoneSvg,
} from './svg'

type IconProps = {
	width?: number
	height?: number
	color?: string
	isFilled?: boolean
	styles?: ViewStyle
}

const ArrowLeft: React.FC<IconProps> = ({ ...rest }) => {
	return <ArrowLeftSvg {...rest} />
}
const AppLogo: React.FC<IconProps> = ({ ...rest }) => {
	return <AppLogoSvg {...rest} />
}

const WelcomeBg: React.FC<IconProps> = ({ ...rest }) => {
	return <WelcomeBgSvg {...rest} />
}

const Customer: React.FC<IconProps> = ({ ...rest }) => {
	return <CustomerSvg {...rest} />
}
const Captain: React.FC<IconProps> = ({ ...rest }) => {
	return <CaptainSvg {...rest} />
}

const DropDown: React.FC<IconProps> = ({ ...rest }) => {
	return <DropDownSvg {...rest} />
}

const ThreeDots: React.FC<IconProps> = ({ ...rest }) => {
	return <ThreeDotsSvg {...rest} />
}

const ArrowRight: React.FC<IconProps> = ({ ...rest }) => {
	return <ArrowRightSvg {...rest} />
}

const Google: React.FC<IconProps> = ({ ...rest }) => {
	return <GoogleSvg {...rest} />
}
const Apple: React.FC<IconProps> = ({ ...rest }) => {
	return <AppleSvg {...rest} />
}
const FaceBook: React.FC<IconProps> = ({ ...rest }) => {
	return <FaceBookSvg {...rest} />
}
const Twitter: React.FC<IconProps> = ({ ...rest }) => {
	return <TwitterSvg {...rest} />
}
const AppleDark: React.FC<IconProps> = ({ ...rest }) => {
	return <AppleDarkSvg {...rest} />
}
const Message: React.FC<IconProps> = ({ ...rest }) => {
	return <MessageSvg {...rest} />
}
const Lock: React.FC<IconProps> = ({ ...rest }) => {
	return <LockSvg {...rest} />
}
const UnChecked: React.FC<IconProps> = ({ ...rest }) => {
	return <UnCheckedSvg {...rest} />
}
const Checked: React.FC<IconProps> = ({ ...rest }) => {
	return <CheckedSvg {...rest} />
}
const Error: React.FC<IconProps> = ({ ...rest }) => {
	return <ErrorSvg {...rest} />
}
const Success: React.FC<IconProps> = ({ ...rest }) => {
	return <SuccessSvg {...rest} />
}
const Calender: React.FC<IconProps> = ({ ...rest }) => {
	return <CalenderSvg {...rest} />
}
const User: React.FC<IconProps> = ({ ...rest }) => {
	return <UserSvg {...rest} />
}
const Phone: React.FC<IconProps> = ({ ...rest }) => {
	return <PhoneSvg {...rest} />
}

const Icon = {
	ArrowLeft,
	AppLogo,
	WelcomeBg,
	Customer,
	Captain,
	DropDown,
	ThreeDots,
	ArrowRight,
	Google,
	Apple,
	FaceBook,
	Twitter,
	AppleDark,
	Message,
	Lock,
	UnChecked,
	Checked,
	Error,
	Success,
	Calender,
	User,
	Phone,
}

export default Icon
