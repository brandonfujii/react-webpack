import React from 'react';
import { render } from 'react-dom';
import BlahComponent from './Component';

const body = document.getElementsByTagName('body')[0];
const app = document.createElement('div');
app.id = 'app';
body.appendChild(app);

render(
	<BlahComponent />,
	document.getElementById('app')
);
