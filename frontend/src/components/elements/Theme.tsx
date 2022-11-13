import React, { Fragment, useState, useEffect } from 'react';

import tw from 'twin.macro';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '@/helpers';
import { useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/solid';

const LightIcon = (props: any) => {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' {...props}>
			<path
				d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
				css={localStorage.theme == 'light' ? tw`fill-sky-400/20 stroke-sky-500` : tw`stroke-slate-400 dark:stroke-slate-500`}></path>
			<path
				d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836'
				css={localStorage.theme == 'light' ? tw`stroke-sky-500` : tw`stroke-slate-400 dark:stroke-slate-500`}></path>
		</svg>
	);
};

const DarkIcon = (props: any) => {
	return (
		<svg viewBox='0 0 24 24' fill='none' {...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z'
				css={localStorage.theme == 'dark' ? tw`fill-sky-400/20` : tw`fill-transparent`}></path>
			<path
				d='m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z'
				css={localStorage.theme == 'dark' ? tw`fill-sky-500` : tw`fill-slate-400 dark:fill-slate-500`}></path>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z'
				css={localStorage.theme == 'dark' ? tw`fill-sky-500` : tw`fill-slate-400 dark:fill-slate-500`}></path>
		</svg>
	);
};

const SystemIcon = (props: any) => {
	return (
		<svg viewBox='0 0 24 24' fill='none' {...props}>
			<path
				d='M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z'
				strokeWidth='2'
				strokeLinejoin='round'
				css={!('theme' in localStorage) ? tw`fill-sky-400/20 stroke-sky-500` : tw`stroke-slate-400 dark:stroke-slate-500`}></path>
			<path
				d='M14 15c0 3 2 5 2 5H8s2-2 2-5'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				css={!('theme' in localStorage) ? tw`stroke-sky-500 fill-transparent` : tw`stroke-slate-400 dark:stroke-slate-500`}></path>
		</svg>
	);
};

const Theme = () => {
	const location = useLocation();

	const themes = [
		{ name: 'Light', value: 'light', icon: LightIcon },
		{ name: 'Dark', value: 'dark', icon: DarkIcon },
		{ name: 'System', value: 'system', icon: SystemIcon },
	];

	const updateTheme = () => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	const setTheme = (mode: string) => {
		localStorage.theme = mode;
		updateTheme();
	};

	const setAuto = () => {
		localStorage.removeItem('theme');
		updateTheme();
	};

	useEffect(() => {
		updateTheme();
	}, []);

	return (
		<Menu as='div' tw='relative inline-block text-left'>
			<div>
				<Menu.Button tw='flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5'>
					<ChevronDownIcon tw='m-1 h-6 w-6' aria-hidden='true' />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'>
				<Menu.Items tw='absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:text-slate-300 mt-2'>
					<div tw='py-1'>
						<Menu.Item>
							{({ active }) => (
								<a
									onClick={() => setTheme('light')}
									css={localStorage.theme == 'light' && tw`text-sky-600`}
									className={classNames(
										active ? 'bg-gray-50 dark:bg-slate-700' : '',
										'block p-1 text-sm text-gray-800 dark:text-gray-300 my-0.5 cursor-pointer'
									)}>
									<LightIcon css={localStorage.theme == 'light' && tw`fill-sky-400 dark:fill-sky-400`} className='ml-1 inline h-6 w-6 mr-2 -mt-0.5' />
									Light
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									onClick={() => setTheme('dark')}
									css={localStorage.theme == 'dark' && tw`dark:text-sky-500`}
									className={classNames(
										active ? 'bg-gray-50 dark:bg-slate-700' : '',
										'block p-1 text-sm text-gray-800 dark:text-gray-300 my-0.5 cursor-pointer'
									)}>
									<DarkIcon className='ml-1 inline h-6 w-6 mr-2 -mt-0.5' />
									Dark
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									onClick={() => setAuto()}
									css={!('theme' in localStorage) && tw`dark:text-sky-500`}
									className={classNames(
										active ? 'bg-gray-50 dark:bg-slate-700' : '',
										'block p-1 text-sm text-gray-800 dark:text-gray-300 my-0.5 cursor-pointer'
									)}>
									<SystemIcon css={!('theme' in localStorage) && tw`fill-sky-400 dark:fill-sky-400`} className='ml-1 inline h-6 w-6 mr-2 -mt-0.5' />
									System
								</a>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Theme;
