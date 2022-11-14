import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements';

const Dashboard = (props: { title: any }) => {
	return (
		<PageContentBlock title={props.title}>
			<div>Dashboard (admin)</div>
		</PageContentBlock>
	);
};

export default Dashboard;
