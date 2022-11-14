import React, { useEffect } from 'react';

import { getToken } from '@/helpers';
import { ScrollToTop } from '@/components/elements';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Slate, QuickRes, NotFound } from '@/components/pages';
import { Login, Dashboard } from '@/components/pages/admin';
import GlobalStyles from '@/assets/styles/GlobalStyles';

const Page = (props: { component: any; title?: any }) => {
	return <props.component title={props.title} />;
};

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<ScrollToTop>
				<Routes>
					<Route path='*' element={<NotFound title='Whoops, cant find' />} />
					<Route path='/' element={<Page component={Slate} />} />
					<Route path='/qr/:data' element={<Page component={QuickRes} />} />
					<Route path='/admin' element={getToken() ? <Page component={Dashboard} /> : <Page component={Login} />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
