import React, { useEffect } from 'react';

import { GlobalStyles } from '@/assets/styles';
import { ScrollToTop } from '@/components/elements/generic';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SlateView, QuickResView, AdminView } from '@/components/pages';

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
					<Route path='/' element={<Page component={SlateView} />} />
					<Route path='/qr/:data' element={<Page component={QuickResView} />} />
					<Route path='/admin' element={<Page component={AdminView} />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
