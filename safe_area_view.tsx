/*
 * 		Diyet Zamanı
 *
 * 	Dosya:
 * 		safe_area_view.tsx
 *
 * 	Kodlama:
 * 		Burak (Nexor)
 *
 * 	Tarih:
 * 		05.05.2025, 12:13:10
 */

import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { StatusBar, StyleProp, ViewStyle } from "react-native";

interface Safe_Area_View_Props extends SafeAreaViewProps
{
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	backgroundColor?: string;
	barStyle?: 'default' | 'light-content' | 'dark-content';
}

export default function Safe_Area_View({ children, style, backgroundColor = '#f5f7fa', barStyle = 'dark-content', ...props }: Safe_Area_View_Props)
{
	return (
		<SafeAreaView style={[{ flex: 1, backgroundColor }, style]} {...props}>
			<StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle} translucent={true} />
			{children}
		</SafeAreaView>
  );
}