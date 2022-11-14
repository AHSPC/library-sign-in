import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
	body: {
		...tw`transition antialiased bg-gray-50 dark:bg-gray-900`,
	},
});

const GlobalStyles = () => (
	<>
		<BaseStyles />
		<Global styles={customStyles} />
	</>
);

export default GlobalStyles;
