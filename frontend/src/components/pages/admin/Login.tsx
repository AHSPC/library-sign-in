import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements';

const Login = (props: { title: any }) => {
	return (
		<PageContentBlock title={props.title}>
			<div>Login (admin)</div>
		</PageContentBlock>
	);
};

export default Login;
