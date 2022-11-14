import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import { decodeData } from '@/helpers';
import { Link, useParams } from 'react-router-dom';
import { PageContentBlock, Transition } from '@/components/elements';

const QuickRes = (props: { title: any }) => {
	const { data } = useParams();

	return (
		data && (
			<PageContentBlock title={props.title}>
				<div>QuickRes {decodeData(data)}</div>
			</PageContentBlock>
		)
	);
};

export default QuickRes;
