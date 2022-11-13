import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements/generic';

const AdminView = (props: { title: any }) => {
	return (
		<PageContentBlock title={props.title}>
			<div>AdminView</div>
		</PageContentBlock>
	);
};

export default AdminView;
