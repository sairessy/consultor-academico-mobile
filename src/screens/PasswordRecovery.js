import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import CONFIG from '../config';

import Constants from 'expo-constants';

export default function PasswordRecovery({ goToScreen, screenId }) {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [cPass, setCPass] = useState('');
	const [confCode, setConfCode] = useState('');
	const [codeSent, setCodeSent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [loadingSendEmail, setLoadingSendEmail] = useState(false);
	const [loadingConfCode, setLoadingConfCode] = useState(false);

	const openModal = async () => {
		setLoadingSendEmail(true);
		if (pass != cPass) {
			alert('As senhas que introduziu não coincidem!');
			setLoadingSendEmail(false);
			return;
		}

		const response = await fetch(CONFIG.server + '/sendrecoverycode', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const json = await response.json();

		if (json.success) {
			setCodeSent(json.codeSent);
			alert('Enviamos o código de confirmação para o seu email (' + email + ')!');
			setLoadingSendEmail(false);
			setShowModal(true);
		} else {
			alert('Ocorreu um erro ao enviar o email, tente novamente!');
		}

		setLoadingSendEmail(false);
	}

	const recoveryPassword = async () => {
		setLoadingConfCode(true);
		if (confCode == codeSent) {
			const response = await fetch(CONFIG.server + '/recoverypassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, pass })
			});

			const json = await response.json();

			if (json.success) {
				alert('Senha redefinida com successo!');
				goToScreen(1);
			}
		} else {
			alert('O código de confirmação é incorrecto!');
		}

		setLoadingConfCode(false);
		setShowModal(false);
	}

	if (screenId != 4) {
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
						style={{ marginTop: 10, backgroundColor: loadingSendEmail ? '#ccc' : CONFIG.colors.primary }}
						onPress={() => openModal()} loading={loadingSendEmail} disabled={loadingSendEmail}
					>
						Recuperar
					</Button>
				</View>

				<Modal
					animationType="slide"
					transparent={false}
					visible={showModal}
					onRequestClose={() => {
						setShowModal(!showModal);
					}}
					style={{ padding: 10, paddingTop: Constants.statusBarHeight }}
				>
					<View style={{ padding: 5 }}>
						<View>
							<Ionicons name='arrow-back' size={20} style={{ margin: 5 }}
								onPress={() => setShowModal(false)}
							/>
						</View>

						<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={confCode}
							mode='outlined' placeholder='Código de confirmação'
							label='Introduza o código de confirmação' onChangeText={text => setConfCode(text)} />

						<Button labelStyle={{ textTransform: 'capitalize' }} mode='contained'
							style={{ marginTop: 5, backgroundColor: loadingConfCode ? '#ccc' : CONFIG.colors.primary }}
							onPress={() => recoveryPassword()} loading={loadingConfCode} disabled={loadingConfCode}
						>
							Confirmar
						</Button>
					</View>
				</Modal>

			</View>
		);
	}
}