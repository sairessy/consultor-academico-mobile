import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import CONFIG from '../config';

export default function SignUp({ goToScreen, screenId }) {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [cPass, setCPass] = useState('');
	const [loading, setLoading] = useState(false);

	const signup = async () => {
		setLoading(true);
		const user = {
			email,
			pass,
			institution: '0',
			img: { ur: '', name: '' },
			level: '0',
			fullName: 'John Doe',
			course: '0',
			zone: '0',
			disciplinas: [{ disciplina: '0', percent: '0' }]
		};

		if (pass !== cPass) {
			setLoading(false);
			alert('As senhas não coincidem!');
			setLoading(false);
			return;
		}

		if (pass == '' || email == '') {
			alert('Preencha todos os campos!');
			setLoading(false);
			return;
		}

		const response = await fetch(CONFIG.server + '/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		const json = await response.json();

		if (json.success) {
			alert('Cadastrado com successo, faça login!');
			goToScreen(1);
		} else {
			alert(json.errorMsg);
		}

		setLoading(false);
	}

	useEffect(() => {
	}, [])

	if (screenId != 2) {
		return null;
	} else {
		return (
			<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
				<View>
					<Ionicons name='arrow-back' size={20} style={{ margin: 5 }}
						onPress={() => goToScreen(1)}
					/>
				</View>
				<View style={{ padding: 10, justifyContent: 'center', flex: 1 }}>
					<View style={{ justifyContent: 'center', padding: 10 }}>
						<Logo justify={'center'} />
					</View>
					<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={email} mode='outlined' placeholder='Email' label='Introduza o email' onChangeText={text => setEmail(text)} />
					<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={pass} mode='outlined' placeholder='Senha' label='Introduza a senha' secureTextEntry={true} onChangeText={text => setPass(text)} />
					<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={cPass} mode='outlined' placeholder='Senha' label='Introduza novamente a senha' secureTextEntry={true} onChangeText={text => setCPass(text)} />
					<Button mode='contained' labelStyle={{ textTransform: 'capitalize' }}
						style={{ marginTop: 10, backgroundColor: loading ? '#ccc' : CONFIG.colors.primary }}
						onPress={() => signup()} loading={loading} disabled={loading}
					>
						Cadastrar
					</Button>
				</View>

			</View>
		);
	}
}