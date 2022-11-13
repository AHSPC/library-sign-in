import React from 'react';

import tw from 'twin.macro';
import { Link, useLocation } from 'react-router-dom';
import { NotFound as ImageLink } from '@/assets/images';
import { PageContentBlock } from '@/components/elements';

const NotFound = (props: { title: string }) => {
	const location = useLocation();

	return (
		<PageContentBlock title={`${props.title} "${location.pathname.slice(1)}"`}>
			<div tw='-mb-2 pb-12'>
				<div tw='px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
					<div tw='mx-auto sm:text-center'>
						<div tw='max-w-xl mb-3 md:mx-auto sm:text-center lg:max-w-2xl'>
							<img tw='object-cover w-[32rem] mx-auto mb-2' src={ImageLink} alt='' />
							<h2 tw='max-w-lg font-sans text-[3.5rem] font-bold leading-none tracking-tight text-black md:mx-auto'>Page not found</h2>
						</div>
						<p tw='mb-6 text-lg text-gray-500 sm:mx-auto font-medium'>
							Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
						</p>
						<Link
							to='/'
							tw='transition border text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border-blue-700 hover:border-blue-800'>
							<svg tw='w-4 h-4 mr-2 -ml-1 rotate-180' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
									clipRule='evenodd'></path>
							</svg>
							Go back home
						</Link>
					</div>
				</div>
			</div>
		</PageContentBlock>
	);
};

export default NotFound;
