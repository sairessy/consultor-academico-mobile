import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, IconButton } from 'react-native-paper';
import CONFIG from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';

export default function Header({ goToScreen, show, toggleSidebar }) {
	const [updateLink, setUpdateLink] = useState('');

	const openProfileScreen = async () => {
		const _tokken = await AsyncStorage.getItem('tokken');
		toggleSidebar();

		if (_tokken === null) {
			goToScreen(1);
		} else {
			goToScreen(3);
		}
	}

	const checkUpdate = async () => {
		const response = await fetch(CONFIG.server + '/appinfo');
		const json = await response.json();
		const version = Constants.manifest.version;
		if (json.version != version) {
			setUpdateLink(json.url);
		}
	}

	useEffect(() => {
		checkUpdate();
	}, []);

	if (!show) {
		return null;
	} else {
		return (
			<View style={{
				flex: 1, height: '100%',
				borderLeftWidth: 1,
				borderLeftColor: '#eee',
				width: '87%', backgroundColor: '#fff', position: 'absolute',
				top: 0, right: 0
			}}
			>
				<TouchableOpacity style={{ height: 140, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}
					onPress={() => openProfileScreen()}
				>
					<Ionicons name='ios-person-circle-sharp' color={CONFIG.colors.primary} size={50} />
				</TouchableOpacity>
				<Button mode='contained' labelStyle={{ textTransform: 'capitalize', color: CONFIG.colors.primary }} icon='home'
					style={{ backgroundColor: '#d3d3ff', margin: 5, alignItems: 'flex-start' }}
					onPress={() => { }}
				>
					Home
				</Button>

				<Button mode='contained' labelStyle={{ textTransform: 'capitalize', color: CONFIG.colors.primary }} icon='tools'
					style={{ backgroundColor: '#d3d3ff', margin: 5, alignItems: 'flex-start' }}
					onPress={() => { }}
				>
					Configurações
				</Button>

				<Button mode='contained' labelStyle={{ textTransform: 'capitalize', color: CONFIG.colors.primary }} icon='phone'
					style={{ backgroundColor: '#d3d3ff', margin: 5, alignItems: 'flex-start' }}
					onPress={() => { }}
				>
					Contacte-nos
				</Button>

				<View>
					{updateLink == '' ?
						<Text style={{ textAlign: 'center' }}>Está usar a última versão!</Text> :
						<Button mode='contained' labelStyle={{ textTransform: 'capitalize', color: CONFIG.colors.primary }} icon='update'
							style={{ backgroundColor: '#d3d3ff', margin: 5, alignItems: 'flex-start' }}
							onPress={() => Linking.openURL(updateLink)}
						>
							Baixar actualização
						</Button>
					}

				</View>
			</View>
		);
	}
}