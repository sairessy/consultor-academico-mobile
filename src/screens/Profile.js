import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Modal, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import Disciplina from '../components/profile/Disciplina';
import AddProduct from '../components/profile/AddProduct';
import UpdateProfile from '../components/profile/UpdateProfile';
import CONFIG from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ screenId, goToScreen }) {
	const [consultorInfo, setConsultorInfo] = useState(null);

	const [showAddPopup, setShowAddPopup] = useState(false);
	const [showUpdateProfilePopup, setShowUpdateProfilePopup] = useState(false);

	const toggleAddPopup = () => {
		setShowAddPopup(!showAddPopup);
	}

	const toggleUpdateProfilePopup = () => {
		getUserInfo();
		setShowUpdateProfilePopup(!showUpdateProfilePopup);
	}

	const logout = async () => {
		await AsyncStorage.removeItem('tokken');
		setConsultorInfo(null);
		goToScreen(0);
	}

	const getUserInfo = async () => {
		const tokken = await AsyncStorage.getItem('tokken');
		const response = await fetch(CONFIG.server + '/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tokken })
		});

		const json = await response.json();
		const user = json[0];
		setConsultorInfo(user);
	}

	useEffect(() => {
		getUserInfo();
	}, []);

	if (screenId != 3) {
		return null;
	} else {
		let userImage = '';
		if (consultorInfo != null) {
			if (consultorInfo.img.name != '') {
				userImage = consultorInfo.img.url;
			}
		}
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<View style={{
					height: 130, backgroundColor: CONFIG.colors.primary,
					justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 10, borderBottomLeftRadius: 10,
				}}>
					<IconButton icon='arrow-left' color='#ddd' size={20} style={{ margin: 5, position: 'absolute', top: 0, left: 0 }}
						onPress={() => goToScreen(0)}
					/>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, right: 0 }}>
						<IconButton icon='plus' color='#fff' size={20} style={{ margin: 5 }}
							onPress={() => toggleAddPopup()}
						/>
						<IconButton icon='pen' color='#ddd' size={20} style={{ margin: 5 }}
							onPress={() => toggleUpdateProfilePopup()}
						/>
						<Ionicons name='log-out' color='#ddd' size={20} style={{ margin: 5 }}
							onPress={() => logout()}
						/>
					</View>
					<View style={{ borderRadius: 5, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
						{userImage == '' ?
							<Ionicons name='person' color='#eee' size={15} /> :
							<Image source={{ uri: userImage }} style={{ width: 50, height: 50, borderRadius: 5 }} />
						}
					</View>
					<Text style={{ color: '#fff', marginTop: 10, textTransform: 'capitalize' }}>{consultorInfo != null ? consultorInfo.fullName : ''}
					</Text>
					<Text style={{ color: '#fff', marginTop: 10, textTransform: 'capitalize', fontSize: 10 }}>{consultorInfo != null ? CONFIG.courses.filter(c => c.id == consultorInfo.course)[0].label : ''}</Text>
				</View>
				<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
					{
						consultorInfo != null && consultorInfo.disciplinas.length > 0 ?
							consultorInfo.disciplinas.map(d => (
								<Disciplina key={d.disciplina} id={d.disciplina} percent={d.percent} getUserInfo={getUserInfo} />
							))
							: null
					}
				</ScrollView>

				<Modal
					animationType="slide"
					transparent={false}
					visible={showAddPopup}
					onRequestClose={() => {
						setShowAddPopup(!showAddPopup);
					}}
				>
					<AddProduct toggleAddPopup={toggleAddPopup} getUserInfo={getUserInfo} />
				</Modal>

				<Modal
					animationType="slide"
					transparent={false}
					visible={showUpdateProfilePopup}
					onRequestClose={() => {
						setShowUpdateProfilePopup(!showUpdateProfilePopup);
					}}
				>
					<UpdateProfile toggleUpdateProfilePopup={toggleUpdateProfilePopup} getUserInfo={getUserInfo} />
				</Modal>
			</View>
		);
	}
}