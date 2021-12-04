import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Picker, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, IconButton } from 'react-native-paper';
import CONFIG from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';

export default function AddProduct({ toggleAddPopup, getUserInfo }) {

	const [disciplina, setDisciplina] = useState('0');
	const [percent, setPercent] = useState('0');
	const [loading, setLoading] = useState(false);

	const addProduct = async () => {
		setLoading(true);
		const data = { disciplina, percent, tokken: await AsyncStorage.getItem('tokken') };
		const response = await fetch(CONFIG.server + '/addproduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();

		setLoading(false);

		if (json.success) {
			getUserInfo();
			alert('Disciplina adicionada!');
		}
	}

	return (
		<View style={{ padding: 5, paddingTop: Constants.statusBarHeight }}>
			<View>
				<Ionicons name='arrow-back' size={20} style={{ margin: 5 }}
					onPress={() => toggleAddPopup()}
				/>
			</View>

			<Picker
				style={{ padding: 10, marginTop: 5, borderWidth: 0, backgroundColor: '#eee', borderRadius: 3 }}
				selectedValue={disciplina}
				onValueChange={(itemValue, itemIndex) =>
					setDisciplina(itemValue)
				}>
				{CONFIG.disciplinas.map(d => (
					<Picker.Item label={d.label} value={d.id} key={d.id} />
				))}
			</Picker>

			<Picker
				style={{ padding: 10, marginTop: 5, borderWidth: 0, backgroundColor: '#eee', borderRadius: 3 }}
				selectedValue={percent}
				onValueChange={(itemValue, itemIndex) =>
					setPercent(itemValue)
				}>
				{CONFIG.percent.map(p => (
					<Picker.Item label={'Dominio de ' + p.label + '%'} value={p.id} key={p.id} />
				))}
			</Picker>

			<Button mode='contained' labelStyle={{ textTransform: 'capitalize' }}
				style={{ marginTop: 10, backgroundColor: loading ? '#ccc' : CONFIG.colors.primary }}
				onPress={() => addProduct()} loading={loading} disabled={loading}
			>
				Adicionar
			</Button>
		</View>
	);
}