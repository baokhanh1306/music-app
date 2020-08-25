import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import GlobalStyle from './utils/global';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<>
				<App />
				<GlobalStyle />
			</>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
