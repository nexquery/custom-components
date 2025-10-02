/*
 * 
 * 	Dosya:
 * 		ButtonGroup.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		30.09.2025, 13:46:31
 */

import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleProp, TextStyle, ViewStyle, StyleSheet } from "react-native";

interface ButtonGroupProps
{
    // Genel ayarlar
    vertical?: boolean,

    // Genel Buton İsimleri
    button: string[],

    // Buton Stilleri
    containerStyle?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonTextStyle?: StyleProp<TextStyle>,
    
    // Buton Ayarları
    activeOpacity?: number,
    disabled?: boolean,
    dividerColor?: string,
    selectedButtonColor?: string,
    selectedButtonTextColor?: string,

    // Indexler
    resetKey?: number,

    // Callbackler
    onPress?: (index: number) => void,
}

export function ButtonGroup({ vertical = false, button, containerStyle, buttonStyle, buttonTextStyle, activeOpacity = 0.7, disabled = false, dividerColor = "#ccc", selectedButtonColor = "#2089DC", selectedButtonTextColor = "#fff", resetKey = 0, onPress = () => {} }: ButtonGroupProps)
{
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [resetKey]);

    return (
        <View style={[styles.container, {flexDirection: vertical ? "column" : "row"}, containerStyle]}>
            {button.map((item, index) => (
                <TouchableOpacity 
                    key={`btnGroup-${index}`} 
                    style={[
                        styles.button, 
                        buttonStyle, 
                        vertical 
                        ? { width: "100%" } 
                        : { flex: 1 },
                        index === selectedIndex && { backgroundColor: selectedButtonColor }, 
                        vertical
                        ? (index !== 0 && index !== button.length) && styles.buttonBorderTop
                        : (index !== 0 && index !== button.length) && styles.buttonBorderLeft,
                        { borderColor: dividerColor },
                    ]} 
                    activeOpacity={activeOpacity} 
                    disabled={disabled}
                    onPress={() => {setSelectedIndex(index); onPress(index)}}
                >
                    <Text style={[buttonTextStyle, index === selectedIndex && { color: selectedButtonTextColor }]}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create(
{
    container:
    {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        overflow: "hidden",
    },

    button: {
        paddingVertical: 8,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonBorderLeft:
    {
        borderLeftWidth: 1,
        borderColor: "#ccc",
    },
    
    buttonBorderTop:
    {
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
});
