import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import CONFIG from '../config';

export default function Logo({ justify, textColor }) {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: justify }}>
			<Image style={{ width: 25, height: 25, marginRight: 10 }}
				source={require('../../assets/icon.png')}
			/>
			<Text style={{ color: textColor != undefined ? textColor : '#000', fontFamily: 'Title' }}>{CONFIG.title}</Text>
		</View>
	);
}