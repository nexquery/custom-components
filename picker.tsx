/*
 * 		Diyet Zamanı
 *
 * 	Dosya:
 * 		picker.tsx
 *
 * 	Kodlama:
 * 		Burak (Nexor)
 *
 * 	Tarih:
 * 		10.05.2025, 10:02:43
 */

import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomText } from "./custom_components";
import { fontPercentage, widthPercentage } from "../utility/scaling";
import { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";

export interface PickerItem
{
	metin: string;
	deger: any;
}

interface PickerProps
{
	// Modalları açacak ve devre dışı bırakacak
	modal?: boolean;
	setModal?: (modal: boolean) => void;

	// Açılan modalın başlık metnini belirleyecek
	baslik_text?: string;

	// Onay ve İptal butonlarının metinlerini belirleyecek
	onay_text?: string;
	iptal_text?: string;

	// Başlangıç index'ini belirleyecek varsayılan 0 olacak yani en üstte
	baslangic_index?: number;

	// Seçilmiş index varsa onu belirleyecek ve baslangic_index yok sayılıp bu değer kullanılacak. (varsayılan değer -1 , 0 ve üstü olursa çalışır)
	secilmis_index?: number;

	// Seçilen indexi dışarıya aktaracak
	export_index?: (deger: number) => void;

	// Listeye gelen itemlerleri listeleyecek
	itemler?: PickerItem[];
}

export function Picker({ modal, setModal, baslik_text, onay_text, iptal_text, baslangic_index = -1, secilmis_index = -1, export_index, itemler }: PickerProps)
{
	// Tıklanan itemin index değeri
	const [secili_item, setSecili_Item] = useState<number | null>(null);

	// Referans
	const Ref_List = useRef<FlashList<PickerItem>>(null);

	// Iptal butonu
	const Iptal = () =>
	{
		setSecili_Item(null);
		setModal?.(false);
	}

	// Onay butonuna tıkladı
	const Onay = (index: number | null) =>
	{
		if(index !== null)
		{
			export_index?.(index);
		}
		setSecili_Item(null);
		setModal?.(false);
	}

	// Modal açıldığında itemi sıfırla ve başlangıç index'ini kaydır
	useEffect(() =>
	{
		// Modal açılınca seçili itemleri yok say
		if (modal)
		{
			setSecili_Item(null);
		}

		// Başlangıç indexini kontrol et, -1 değilse belirtilen konuma git
		if(modal && baslangic_index !== -1 && secilmis_index === -1)
		{
			// Başlangıç index aktif olduğu seçimi yaptırmıyoruz
			setTimeout(() =>
			{
				Ref_List.current?.scrollToIndex({ index: baslangic_index, animated: true, viewPosition: 0.5 });
			}, 250);
		}

		// İtem seçilmiş ise onun konumuna git ve tekrar onu aktif et
		if(modal && secilmis_index !== -1)
		{
			setTimeout(() =>
			{
				Ref_List.current?.scrollToIndex({ index: secilmis_index, animated: true, viewPosition: 0.5 });
				setSecili_Item(secilmis_index);
			}, 250);
		}





		// if(modal && baslangic_index !== -1)
		// {
		// 	setTimeout(() =>
		// 	{
		// 		if(cache_index === -1)
		// 		{
		// 			Ref_List.current?.scrollToIndex({ index: baslangic_index, animated: true, viewPosition: 0.5 });
		// 		}
		// 		else
		// 		{
		// 			Ref_List.current?.scrollToIndex({ index: cache_index, animated: true, viewPosition: 0.5 });
		// 			setSecili_Item(cache_index);
		// 		}
		// 	}, 250);
		// }
	}, [modal, baslangic_index]);

	const RenderItem = ({ index, item }: { index: number; item: PickerItem }) =>
	{
		return (
			<View style={{ width: "100%", height: widthPercentage(40) }}>
				<TouchableOpacity
					id={index.toString()}
					activeOpacity={1}
					style={[styles.btn_item, { backgroundColor: secili_item === index ? "#e0f2e0" : "#f8f8f8",}]}
					onPress={() => setSecili_Item(index)}
				>
					<CustomText style={styles.item_text}>{item.metin}</CustomText>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<Modal visible={modal} transparent={true} animationType="fade" statusBarTranslucent={true} onRequestClose={Iptal}>
			<View style={styles.container}>
				<View style={styles.kutu}>
					<View style={styles.baslik}>
						<CustomText style={styles.baslik_text}>{baslik_text}</CustomText>
					</View>

					<View style={styles.icerik_alan}>
						<FlashList
							ref={Ref_List}
							data={itemler}
							keyExtractor={(item) => item.deger.toString()}
							extraData={secili_item}
							renderItem={RenderItem}
							estimatedItemSize={50}
						/>
					</View>

					<View style={styles.alt_butonlar}>
						<TouchableOpacity style={styles.alt_buton} onPress={Iptal} activeOpacity={0.8}>
							<CustomText style={styles.alt_buton_text}>{iptal_text}</CustomText>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.alt_buton, { opacity: secili_item !== null ? 1 : 0.5 }]} disabled={secili_item === null} activeOpacity={0.8} onPress={() => Onay(secili_item)}>
							<CustomText style={styles.alt_buton_text}>{onay_text}</CustomText>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create(
{
	container:
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

	kutu:
	{
		width: '85%',
		backgroundColor: '#fff',
		padding: widthPercentage(15),
		borderRadius: widthPercentage(10),
	},

	baslik:
	{
		// padding: widthPercentage(10),
		// borderBottomWidth: widthPercentage(1),
		// borderBottomColor: '#e0e0e0',
	},

	baslik_text:
	{
		paddingBottom: widthPercentage(10),
		color: '#333333',
		fontSize: fontPercentage(16),
		fontFamily: 'Nunito-Bold',
	},

	alt_butonlar:
	{
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: widthPercentage(15),
		gap: widthPercentage(15),
	},

	alt_buton:
	{
		backgroundColor: '#000000',
		borderRadius: widthPercentage(5),
	},

	alt_buton_text:
	{
		color: '#ffffff',
		fontFamily: 'Nunito-SemiBold',
		fontSize: fontPercentage(14),
		padding: widthPercentage(5),
		paddingHorizontal: widthPercentage(10),
		textAlign: "center",
	},

	icerik_alan:
	{
		height: widthPercentage(300)
	},

	btn_item:
	{
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
		borderRadius: widthPercentage(5),
		padding: widthPercentage(10),
	},

	item_text:
	{
		color: '#333333',
		fontSize: fontPercentage(14),
		fontFamily: 'Nunito-Regular',
	},
})