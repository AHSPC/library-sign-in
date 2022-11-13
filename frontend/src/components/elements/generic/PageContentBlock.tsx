import { useEffect } from 'react';

const PageContentBlock = (props: { title?: string; children: any }) => {
	useEffect(() => {
		document.title = props.title ? props.title + ' | RouteKey v2' : 'RouteKey v2';
	}, [props.title]);
	return props.children;
};

export default PageContentBlock;
