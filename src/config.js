const CONFIG = {
	title: 'Consultor Académico',
	server: 'https://consultor-academico.herokuapp.com',
	// server: 'http://localhost:3000',
	colors: {
		primary: '#4b0082'
	},
	courses: [
		{ id: 0, label: 'Matemática', disciplinas: [0, 1] },
		{ id: 1, label: 'Informática' },
		{ id: 2, label: 'Estatística' },
		{ id: 3, label: 'Ciências de Informação geográfica' },
		{ id: 4, label: 'Engenharia Química' },
		{ id: 5, label: 'Engenharia Mecânica' },
		{ id: 6, label: 'Engenharia Informática' },
		{ id: 7, label: 'Geologia' }
	],
	zones: [
		{ id: 0, label: 'Coop' },
		{ id: 1, label: 'Liberdade' },
		{ id: 2, label: 'Museu' },
		{ id: 3, label: 'Alto Maé' },
		{ id: 4, label: 'Zimpeto' },
		{ id: 5, label: 'Baixa' },
		{ id: 6, label: 'Malhangalene' },
		{ id: 7, label: 'Hulene' }

	],
	disciplinas: [
		{ id: 0, label: 'Análise Matemática' },
		{ id: 1, label: 'Probabilidade e Estatística' },
		{ id: 2, label: 'Estatística Básica' },
		{ id: 3, label: 'Matemática Discreta' },
		{ id: 4, label: 'Programação' },
		{ id: 5, label: 'Álgebra linear e geometria analítica' },
		{ id: 6, label: 'Investigação operacional' },
		{ id: 7, label: 'Matemática Básica' }
	],
	institutions: [
		{ id: 0, label: 'UEM' },
		{ id: 1, label: 'UP' },
		{ id: 2, label: 'ISUTC' },
		{ id: 3, label: 'ISCTEM' }
	],
	levels: [
		{ id: 0, label: 'Licenciatura' },
		{ id: 1, label: 'Mestrado' },
		{ id: 2, label: 'Doutoramento' }
	],
	percent: [
		{ id: 0, label: '99' },
		{ id: 1, label: '90' },
		{ id: 2, label: '80' },
		{ id: 3, label: '70' },
	]
};

export default CONFIG;