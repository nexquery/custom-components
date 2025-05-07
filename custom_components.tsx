/*
 * 		Diyet Zamanı
 *
 * 	Dosya:
 * 		custom_text.tsx
 *
 * 	Kodlama:
 * 		Burak (Nexor)
 *
 * 	Tarih:
 * 		05.05.2025, 12:19:51
 */

import { StyleProp, Text, TextInput, TextInputProps, TextProps, TextStyle } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

const FONT_OLCEKLEME = true;

interface CustomTextProps
{
	children?: React.ReactNode;
	style?: StyleProp<TextStyle>;
	font_olcekleme?: boolean;
}

interface CustomAnimatedTextProps extends AnimatedProps<TextProps>
{
	style?: StyleProp<TextStyle>;
	children?: React.ReactNode;
	font_olcekleme?: boolean;
}

interface CustomTextInputProps extends TextInputProps
{
	font_olcekleme?: boolean;
}

export function CustomText({ children, style, font_olcekleme = FONT_OLCEKLEME }: CustomTextProps)
{
	return (
		<Text allowFontScaling={font_olcekleme} style={style}>
			{children}
		</Text>
	)
}

export function CustomAnimatedText({ children, style, font_olcekleme = FONT_OLCEKLEME, ...props }: CustomAnimatedTextProps)
{
	return (
		<Animated.Text allowFontScaling={font_olcekleme} style={style} {...props}>
			{children}
		</Animated.Text>
	)
}

export function CustomTextInput({ font_olcekleme = FONT_OLCEKLEME, ...props }: CustomTextInputProps)
{
	return (
		<TextInput allowFontScaling={font_olcekleme} {...props} />
	)
}