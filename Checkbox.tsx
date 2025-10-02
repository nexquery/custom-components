/*
 * 
 * 	Dosya:
 * 		Checkbox.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		01.10.2025, 15:29:44
 */

import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

type Props = 
{
    initialChecked?: boolean;
    size?: number;
    borderColor?: string;
    borderRadius?: number;
    unCheckedColor?: string;
    checkedBackgroundColor?: string;
    checkedColor?: string;
    btnStyle?: ViewStyle;
    onChange?: (checked: boolean) => void;
    children?: React.ReactNode;
};

export function Checkbox({ initialChecked = false, size = 18, borderColor = '#D1D5DB', borderRadius = 6, unCheckedColor = '#D1D5DB', checkedBackgroundColor = '#5352ed', checkedColor = '#ffffff', btnStyle, onChange, children }: Props)
{
    const [checked, setChecked] = useState(initialChecked);
    const progress = useSharedValue(initialChecked ? 1 : 0);
    
    useEffect(() =>
    {
        setChecked(initialChecked);
        progress.value = initialChecked ? 1 : 0; 
    }, [initialChecked]);
    
    const checkDurum = () =>
    {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
        onChange?.(newCheckedState);
        
        progress.value = withTiming(newCheckedState ? 1 : 0, { duration: 250 });
    }

    const animatedStyle = useAnimatedStyle(() =>
    {
        const backgroundColor = interpolateColor(
            progress.value, 
            [0, 1], 
            [unCheckedColor, checkedBackgroundColor]
        );
        
        return { 
            backgroundColor,
        };
    });

    const checkAnimatedStyle = useAnimatedStyle(() =>
    {
        const opacity = withTiming(progress.value, { duration: 250 });
        const scale = withTiming(progress.value * 0.8 + 0.2, { duration: 250 });
        return { opacity, transform: [{ scale }] };
    });

    return (
        <TouchableOpacity style={[styles.btnContainer, btnStyle]} activeOpacity={1} onPress={checkDurum}>
            <Animated.View style={[styles.checkBox,  { width: size, height: size, borderWidth: 1, borderColor: !checked ? borderColor : checkedBackgroundColor, borderRadius }, animatedStyle]}>
                <Animated.View style={[styles.checkBox, { width: size, height: size, position: 'absolute', }, checkAnimatedStyle]}>
                    <FontAwesome6 name="check" size={size * 0.6} color={checkedColor} iconStyle="solid" />
                </Animated.View>
            </Animated.View>

            {children && 
                <View style={styles.textWrapper}>
                    {children}
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
{
    btnContainer: {
        flexDirection: 'row',       // kutu ve metin yan yana
        alignItems: 'center',   // üstten hizala
        gap: 10,
    },

    checkBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    textWrapper: {
        flex: 1,                    // uzun metinleri sarmak için alan genişlet
        justifyContent: 'center', // metni üstten hizala
    },

    text: {
        fontSize: 13,
        flexWrap: 'wrap',
    }
});
