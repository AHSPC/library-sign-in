import React, { useState, useEffect, Fragment } from 'react';

import tw from 'twin.macro';
import QRCode from 'react-qr-code';
import { classNames } from '@/helpers';
import { Link } from 'react-router-dom';
import { Listbox } from '@headlessui/react';
import { PageContentBlock, Transition } from '@/components/elements/generic';
import { BookOpenIcon, CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const reasons = [
	{ id: 0, name: 'Lunch time' },
	{ id: 1, name: 'Sent by teacher' },
	{ id: 2, name: 'Free period' },
	{ id: 3, name: 'Before / After school' },
];

const transitionPropsOverlay = {
	enter: tw`ease-out duration-300`,
	enterFrom: tw`opacity-0`,
	enterTo: tw`opacity-100`,
	leave: tw`ease-in duration-200`,
	leaveFrom: tw`opacity-100`,
	leaveTo: tw`opacity-0`,
};

const Slate = (props: { title: any }) => {
	const [selected, setSelected] = useState(reasons[0]);

	return (
		<PageContentBlock title={props.title}>
			<div tw='max-w-7xl mx-auto sm:px-6 lg:px-8'>
				<div tw='flex justify-center items-center h-screen'>
					<div>
						<h2 tw='font-semibold text-sm uppercase text-gray-600 -mt-16'>login page</h2>
						<h1 tw='font-extrabold text-3xl -mt-1'>AHS Library</h1>
						<div tw='mt-2 bg-white border border-gray-200 px-4 py-5 sm:p-5 shadow-sm rounded-lg w-96'>
							<div tw='-mt-1 mb-3'>
								<label htmlFor='fullname' tw='block text-sm font-medium text-gray-700'>
									Full Name
								</label>
								<div tw='mt-1 relative flex items-center'>
									<input
										type='text'
										name='fullname'
										id='fullname'
										placeholder='John Doe'
										tw='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md'
									/>
									<div tw='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
										<kbd tw='inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400'>tab</kbd>
									</div>
								</div>
							</div>
							<Listbox value={selected} onChange={setSelected} tw='mt-4'>
								{({ open }) => (
									<>
										<Listbox.Label tw='block text-sm font-medium text-gray-700'>Reason</Listbox.Label>
										<div tw='mt-1 relative'>
											<Listbox.Button tw='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'>
												<span tw='block truncate'>{selected.name}</span>
												<span tw='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
													<SelectorIcon tw='h-5 w-5 text-gray-400' aria-hidden='true' />
												</span>
											</Listbox.Button>

											<Transition show={open} as={Fragment}>
												<Listbox.Options tw='absolute z-[200] mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
													{reasons.map((item) => (
														<Listbox.Option
															key={item.id}
															className={({ active }) =>
																classNames(active ? 'text-white bg-blue-600' : 'text-gray-900', 'cursor-pointer select-none relative py-2 pl-8 pr-4')
															}
															value={item}>
															{({ selected, active }) => (
																<>
																	<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{item.name}</span>

																	{selected ? (
																		<span
																			className={classNames(
																				active ? 'text-white' : 'text-blue-600',
																				'absolute inset-y-0 left-0 flex items-center pl-1.5'
																			)}>
																			<CheckIcon tw='h-5 w-5' aria-hidden='true' />
																		</span>
																	) : null}
																</>
															)}
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Transition>
										</div>
									</>
								)}
							</Listbox>
							<div tw='mt-5 border-t border-gray-300 relative  bg-gray-50 -mx-5 px-5 py-3 -mb-5 rounded-b-md'>
								<div tw='relative flex'>
									<button
										type='button'
										className='group'
										tw='transition inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-blue-500 hover:border-blue-600 hover:text-blue-50 focus:outline-none'>
										<BookOpenIcon tw='-ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-blue-200' aria-hidden='true' />
										<span>Submit form</span>
									</button>
								</div>
							</div>
						</div>
						<div tw='mt-2 bg-white border border-gray-200 px-4 py-5 sm:p-5 shadow-sm rounded-lg w-96'>
							qr here
							<QRCode size={256} style={{ height: '80px' }} viewBox={`0 0 256 256`} value={`URL/qr/period and tracking as b64`} />
						</div>
					</div>
					<p tw='absolute font-semibold text-xs bottom-5 left-5'>
						This form is being submitted during <code tw='rounded-md bg-gray-200 py-0.5 px-1.5'>period 4</code>
					</p>
					<p tw='absolute font-semibold text-xs bottom-5 right-5'>Made by (names here)</p>
				</div>
			</div>
		</PageContentBlock>
	);
};

export default Slate;
