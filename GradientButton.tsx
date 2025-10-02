/*
 * 
 * 	Dosya:
 * 		GradientButton.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		01.10.2025, 10:44:09
 */

import React from "react";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";


interface GradientButtonProps
{
    // Genel Ayarlar
    icon?: string,
    iconSize?: number,
    text: string,
    gColor: string[],
    gYon?: 'YATAY' | 'DIKEY',
    radius?: number,

    // Stil ayarları
    btnStyle?: StyleProp<ViewStyle>,
    btnGradientStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,

    // Callbackler
    onPress?: () => void,
}

const YON =
{
    DIKEY:
    {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
    },
    
    YATAY:
    {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
    },
} as const;

export function GradientButton({ icon, iconSize = 15, text,gColor, gYon = 'YATAY', radius, onPress, btnStyle, btnGradientStyle, textStyle }: GradientButtonProps)
{
    return (
        <TouchableOpacity style={btnStyle} activeOpacity={0.7} onPress={onPress}>
            <LinearGradient style={[styles.btnGradient, { borderRadius: radius, gap: icon ? 10 : 0 }, btnGradientStyle]} colors={gColor} start={gYon === 'YATAY' ? YON.YATAY.start : YON.DIKEY.start} end={gYon === 'YATAY' ? YON.YATAY.end : YON.DIKEY.end}>
                {icon && <FontAwesome6 name={icon as any} size={iconSize} color="white" iconStyle="solid" />}
                <Text style={textStyle}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
{
    btnGradient:
    {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
