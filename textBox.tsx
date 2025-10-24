/*
 * 		Hesap Defterim Uygulaması
 * 
 * 	Dosya:
 * 		textBox.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		24.10.2025, 20:38:20
 */

import { Pressable, TextInput, TextInputProps, StyleSheet, PixelRatio, View, StyleProp, ViewStyle, ColorValue } from "react-native";
import { ReactElement } from "react";

interface TextBoxProps extends TextInputProps
{
    containerStyle?: StyleProp<ViewStyle>;
    textColor?: ColorValue;
    iconSol?: ReactElement;
    iconSolClick?: () => void;
    iconSag?: ReactElement;
    iconSagClick?: () => void;
}

export function TextBox(props: TextBoxProps)
{
    return (
        <View style={[styles.container, props.containerStyle]}>
            <Pressable onPress={props.iconSolClick}>{props.iconSol}</Pressable>
            <TextInput
                style={[styles.box, { color: props.textColor ?? 'rgba(0, 0, 0, 1)' }]} 
                placeholder="TextBox"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                {...props}
            />
            {props.iconSag && <Pressable onPress={props.iconSagClick}>{props.iconSag}</Pressable>}
        </View>
    )
}

const styles = StyleSheet.create(
{
    container:
    {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },

    box:
    {
        flex: 1,
        paddingVertical: 8 * PixelRatio.getFontScale(),
    },
})