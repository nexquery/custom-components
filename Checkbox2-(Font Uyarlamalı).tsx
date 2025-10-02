/*
 * 		Hesap Defterim Client
 * 
 * 	Dosya:
 * 		Checkbox.tsx
 * 
 * 	Kodlama:
 * 		Burak (Nexor)
 * 
 * 	Tarih:
 * 		10.09.2025, 10:11:22
 */

import { sp, scaledIconSize } from "../Functions/Responsive";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CheckboxProps {
    isaretli: boolean;
    onChange: (isaretli: boolean) => void;

    iconSize?: number;
    iconRenk?: string;

    children?: React.ReactNode;
}

export default function Checkbox({
    isaretli,
    onChange,
    iconSize = 12,
    iconRenk = "#2563EB",
    children,
}: CheckboxProps) {
    const scaledSize = scaledIconSize(iconSize); // ikon boyutu ölçeklenmiş
    const boxSize = scaledSize * 1.4; // kutu ikon boyutuna göre büyüdü

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onChange(!isaretli)}
            activeOpacity={0.8}
        >
            <View
                style={[
                    styles.box,
                    {
                        width: boxSize,
                        height: boxSize,
                        borderRadius: boxSize / 4,
                    },
                    isaretli && styles.box_isaretli,
                ]}
            >
                {isaretli && (
                    <Icon
                        name="check"
                        size={scaledSize}
                        color={'#ffffff'}
                    />
                )}
            </View>

            <View style={styles.labelContainer}>{children}</View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: sp(3),
    },

    box: {
        borderWidth: sp(1),
        borderColor: "rgba(0, 0, 0, 0.3)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: sp(10),
    },

    box_isaretli: {
        backgroundColor: "#2563EB",
        borderColor: "transparent",
    },

    labelContainer: {
        flex: 1,
        flexShrink: 1,
    },
});