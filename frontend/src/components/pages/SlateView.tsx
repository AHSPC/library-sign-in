import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements/generic';

const SlateView = (props: { title: any }) => {
	return (
		<PageContentBlock title={props.title}>
			<div>SlateView</div>
		</PageContentBlock>
	);
};

export default SlateView;
