import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements/generic';

const QuickResView = (props: { title: any }) => {
	return (
		<PageContentBlock title={props.title}>
			<div>QuickResView</div>
		</PageContentBlock>
	);
};

export default QuickResView;
