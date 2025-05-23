/*
 * 		Diyet Zamanı
 *
 * 	Dosya:
 * 		icon_input.tsx
 *
 * 	Kodlama:
 * 		Burak (Nexor)
 *
 * 	Tarih:
 * 		10.05.2025, 09:28:17
 */

import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { TextInputProps } from "react-native";
import { fontPercentage, widthPercentage } from "../utility/scaling";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from "./custom_components";

interface IconInputProps
{
	icon_name: string;
	icon_color: string;
	icon_size?: number;
	bottomValue?: number;
	view_style?: StyleProp<ViewStyle>;
	icon_style?: StyleProp<TextStyle>;
	input_style?: StyleProp<TextInputProps>;
	input_props?: TextInputProps;
	children?: React.ReactNode;
}

export default function IconInput({ icon_name, icon_color, icon_size = 20, view_style, icon_style, input_style, input_props, bottomValue = 15, children }: IconInputProps)
{
	return (
		<View style={[styles.alan_view, { marginBottom: widthPercentage(bottomValue) }, view_style]}>
			<Icon
				name={icon_name}
				size={fontPercentage(icon_size)}
				color={icon_color}
				style={[styles.iconInside, icon_style]}
			/>
			<CustomTextInput
				style={[styles.inputInside, input_style]}
				placeholderTextColor="#888888"
				{...input_props}
			/>
			{children && (
				<View style={styles.rightContent}>
					{children}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create(
{
	alan_view:
	{
		position: 'relative',
		justifyContent: 'center',
	},

	iconInside:
	{
		position: 'absolute',
		left: widthPercentage(12),
		zIndex: 1,
	},

	inputInside:
	{
		paddingLeft: widthPercentage(40),
		borderWidth: widthPercentage(1),
		borderColor: '#ccc',
		borderRadius: widthPercentage(8),
		height: widthPercentage(48),
		backgroundColor: '#fff',
		color: '#1E1E1E',
		fontFamily: 'Nunito-Regular',
		fontSize: fontPercentage(14),
	},

	rightContent: {
		position: 'absolute',
		right: widthPercentage(12),
		zIndex: 1,
	},
})