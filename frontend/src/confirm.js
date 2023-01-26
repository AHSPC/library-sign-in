import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';

export default function Confirm () {
	const time = Temporal.Now.plainTimeISO().round("second")
	return (
		<h1 className='text-white'>
		SIGNED IN AT { time.toString() }
		</h1>
	)
}
