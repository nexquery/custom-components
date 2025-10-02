/*
 * 
 * 	Dosya:
 * 		ProgressBar.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		01.10.2025, 14:36:13
 */

import React, { useEffect } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

interface ProgressBarProps
{
    current: number;
    total: number;
    color?: string;
    height?: number;
    width?: number;
    radius?: number;
    duration?: number;
    alpha?: number;
    containerStyle?: StyleProp<ViewStyle>;
}

export function ProgressBar({ current, total, color = "#a29bfe", height = 8, width = 50, radius = 6, duration = 1000, alpha = 0.2, containerStyle }: ProgressBarProps)
{
    const animatedProgress = useSharedValue(0);

    useEffect(() =>
    {
        // Güvenli yüzdeyi hesapla
        const safeProgress = total > 0 ? (current / total) * 100 : 0;

        // Animasyonu başlat
        animatedProgress.value = withTiming(Math.min(100, Math.max(0, safeProgress)),
        {
            duration,
            easing: Easing.inOut(Easing.quad),
        });
    }, [current, total, duration]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${animatedProgress.value}%`,
    }));

    return (
        <View style={[{ overflow: "hidden", height, width: `${width}%`, borderRadius: radius, backgroundColor: hexToRgba(color, alpha) }, containerStyle]}>
            <Animated.View style={[animatedStyle, { height: "100%", borderRadius: radius, backgroundColor: color }]} />
        </View>
    );
}

function hexToRgba(hex: string, alpha: number = 1): string {
    if (typeof hex !== "string") {
        throw new Error("hexToRgba: Hex color must be a string");
    }

    // # işareti varsa temizle
    hex = hex.trim().replace(/^#/, "");

    // Hex geçerliliğini regex ile kontrol et (#RGB, #RRGGBB formatları)
    if (!/^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex)) {
        throw new Error(`hexToRgba: Invalid hex color "${hex}"`);
    }

    // 3 haneli hex → 6 haneli hex'e çevir (#03F → #0033FF gibi)
    if (hex.length === 3) {
        hex = hex.split("").map(char => char + char).join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // alpha kontrolü (0–1 arası olmalı)
    const safeAlpha = Math.min(1, Math.max(0, alpha));

    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}