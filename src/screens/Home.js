import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/home/Header';
import Consultor from '../components/home/Consultor';
import { Button } from 'react-native-paper';

import Sidebar from '../components/home/Sidebar';
import CONFIG from '../config';

export default function Home({ screenId, goToScreen }) {
	const [showSidebar, setShowSidebar] = useState(false);
	const [users, setUsers] = useState([]);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	}

	const getUsers = async () => {
		const response = await fetch(CONFIG.server + '/users');
		const json = await response.json();
		setUsers(json);
	}

	useEffect(() => {
		getUsers();
	}, [])

	if (screenId != 0) {
		return null;
	} else {
		return (
			<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
				<Header goToScreen={goToScreen} toggleSidebar={toggleSidebar} show={showSidebar} />
				<ScrollView style={{ flex: 1 }}>
					{users.length > 0 ?
						users.map(u => (
							<Consultor
								key={u._id} fullName={u.fullName} course={u.course} institution={u.institution} zone={u.zone}
								contact={u.phoneNumber} disciplinas={u.disciplinas} img={u.img}
							/>
						)) : null
					}

					{/* <Button
						mode='contained'
						icon='plus'
						labelStyle={{ textTransform: 'capitalize', }}
						style={{
							backgroundColor: CONFIG.colors.primary, margin: 5,
							display: users.length > 0 ? 'flex' : 'none'
						}}
						onPress={() => { }}
					>
						Consultores
					</Button> */}

				</ScrollView>
				<Sidebar show={showSidebar} goToScreen={goToScreen} toggleSidebar={toggleSidebar} />
			</View>
		);
	}
}