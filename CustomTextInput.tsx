/*
 * 		Hesap Defterim Client
 * 
 * 	Dosya:
 * 		CustomTextInput.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		10.09.2025, 10:05:52
 */

import React from "react";
import { fp, sp, scaledIconSize } from "../Functions/Responsive";
import { TextInput, View, StyleSheet, TextInputProps, TouchableOpacity, ViewStyle, TextStyle, } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type CustomTextInputProps = TextInputProps & 
{
    leftIconName?: string;
    rightIconName?: string;
    onRightIconPress?: () => void;

    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;

    iconColor?: string;
    iconSize?: number;
    fontSize?: number;
    borderRadius?: number;
    minHeight?: number;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({ leftIconName, rightIconName, onRightIconPress, containerStyle, inputStyle, iconColor = "#888", iconSize = 20, fontSize = 16, borderRadius = 8, minHeight = 44, ...rest }) =>
{
    const scaledFontSize = fp(fontSize);
    const verticalPadding = sp(1);

    // Input yüksekliği = fontSize + padding
    const calculatedHeight = Math.max(sp(minHeight), scaledFontSize + verticalPadding * 2);

    return (
        <View style={[styles.container, { minHeight: calculatedHeight, borderRadius: sp(borderRadius), paddingVertical: verticalPadding }, containerStyle]}>
            {leftIconName && (
                <Icon name={leftIconName} size={scaledIconSize(iconSize)} color={iconColor} style={styles.iconLeft} />
            )}

            <TextInput style={[styles.input, { fontSize: scaledFontSize, minHeight: scaledFontSize * 1.4 }, inputStyle]} placeholderTextColor="#999" {...rest} />
            {rightIconName && (
                <TouchableOpacity onPress={onRightIconPress}>
                    <Icon name={rightIconName} size={scaledIconSize(iconSize)} color={iconColor} style={styles.iconRight} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create(
{
    container:
    {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: sp(1),
        borderColor: "#ccc",
        paddingHorizontal: sp(10),
        backgroundColor: "#fff",
    },
    
    input:
    {
        flex: 1,
        color: "#000",
    },
    
    iconLeft:
    {
        marginRight: sp(8),
    },
    
    iconRight:
    {
        marginLeft: sp(8),
    },
});

export default CustomTextInput;