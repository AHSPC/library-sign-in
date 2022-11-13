import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements/generic';

const Slate = (props: { title: any }) => {
	return (
		<PageContentBlock title={props.title}>
			<div>Slate</div>
		</PageContentBlock>
	);
};

export default Slate;
