<script lang="ts">
	import { Temporal } from '@js-temporal/polyfill'
	import axios from 'axios'

	let textInput = ''
	let sentByTeacher = false

	function scheduleCheck() {
		let schedule
		const signIn = Temporal.Now.plainTimeISO().round({ smallestUnit: 'minute' })
		const signInstant = Temporal.Now.instant().round({ smallestUnit: 'minute' })
		// switch (new Date(new Temporal.Now.plainDateTimeISO().toString).getDay()) {
		const day = new Date(signInstant.toString()).getDay()

		switch (day) {
			case 1:
				schedule = {
					name: 'Monday',
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }), // 1st Period Start
						Temporal.PlainTime.from({ hour: 9, minute: 25 }), // 2nd Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 25 }), // 3rd Period Start
						Temporal.PlainTime.from({ hour: 11, minute: 25 }), // 4th Period Start
						Temporal.PlainTime.from({ hour: 12, minute: 15 }), // Lunch Start
						Temporal.PlainTime.from({ hour: 13, minute: 5 }), // 5th Period Start
						Temporal.PlainTime.from({ hour: 14, minute: 0 }), // 6th Period Start
						Temporal.PlainTime.from({ hour: 15, minute: 0 }), // 7th Period Start
						Temporal.PlainTime.from({ hour: 15, minute: 50 }), // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				}
				break
			case 2:
			case 4:
				schedule = {
					name: 'A',
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }), // 1st Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 15 }), // 3rd Period Start
						Temporal.PlainTime.from({ hour: 11, minute: 55 }), // Lunch Start
						Temporal.PlainTime.from({ hour: 12, minute: 40 }), // 5th Period Start
						Temporal.PlainTime.from({ hour: 14, minute: 25 }), // 7th Period Start
						Temporal.PlainTime.from({ hour: 16, minute: 0 }), // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				}
				break
			case 3:
			case 5:
				schedule = {
					name: 'B',
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }), // 2nd Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 10 }), // Advisory Start
						Temporal.PlainTime.from({ hour: 10, minute: 50 }), // 4th Period Start
						Temporal.PlainTime.from({ hour: 12, minute: 40 }), // Lunch Start
						Temporal.PlainTime.from({ hour: 13, minute: 25 }), // 6th Period Start
						Temporal.PlainTime.from({ hour: 15, minute: 5 }), // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				}
				break
			default:
				// throw "It's the weekend go home"
				schedule = {
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }), // 2nd Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 10 }), // Advisory Start
						Temporal.PlainTime.from({ hour: 10, minute: 50 }), // 4th Period Start
						Temporal.PlainTime.from({ hour: 12, minute: 40 }), // Lunch Start
						Temporal.PlainTime.from({ hour: 13, minute: 25 }), // 6th Period Start
						Temporal.PlainTime.from({ hour: 15, minute: 5 }), // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				}
		}
		return schedule
	}
	// Finds current period based on todays schedule
	function timeCheck(schedule: any): any {
		const signIn = Temporal.Now.plainTimeISO().round({ smallestUnit: 'minute' })
		const isSignIn = (value: any) => {
			return value.equals(signIn)
		}
		let rv = {}
		switch (schedule.times.findIndex(isSignIn)) {
			case 0:
				rv = { reasons: [{ name: 'Before or After School', id: 3 }], period: 0 }
				break
			case 1:
				if (schedule.name === 'Monday' || schedule.name === 'A') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 1 }
				} else {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 2 }
				}
				break
			case 2:
				if (schedule.name === 'Monday') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 2 }
				} else if (schedule.name === 'A') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 3 }
				} else {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 0 }
				}
				break
			case 3:
				if (schedule.name === 'Monday') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 3 }
				} else if (schedule.name === 'A') {
					rv = { reasons: [{ name: 'Lunch', id: 0 }], period: 0 }
				} else {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 4 }
				}
				break
			case 4:
				if (schedule.name === 'Monday') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 4 }
				} else if (schedule.name === 'A') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 5 }
				} else {
					rv = { reasons: [{ name: 'Lunch', id: 0 }], period: 0 }
				}
				break
			case 5:
				if (schedule.name === 'Monday') {
					rv = { reasons: [{ name: 'Lunch', id: 0 }], period: 0 }
				} else if (schedule.name === 'A') {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 7 }
				} else {
					rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 6 }
				}
				break
			case 6:
				if (schedule.name === 'Monday') {
					rv = { reasons: [{ name: 'Lunch', id: 0 }], period: 0 }
				} else if (schedule.name === 'A') {
					rv = { reasons: [{ name: 'Before or After School', id: 3 }], period: 0 }
				} else {
					rv = { reasons: [{ name: 'Before or After School', id: 3 }], period: 0 }
				}
				break
			case 7:
				rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 6 }
				break
			case 8:
				rv = { reasons: [{ name: 'Free Period', id: 2 }], period: 7 }
				break
			case 9:
				rv = { reasons: [{ name: 'Before or After School', id: 3 }], period: 0 }
				break
			default:
				throw 'Temporal Archmage!'
		}
		return rv
	}
	const findReason = (time: any) => {
		let rv = 0
		if (sentByTeacher) {
			rv = 1
		} else {
			rv = time.reasons[0].id
		}
		return rv
	}
</script>

<div class="absolute top-2 right-2" />
<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="flex items-center justify-center h-screen">
		<div>
			<h1 class="-mt-1 text-3xl font-extrabold transition dark:text-slate-200">AHS Library</h1>
			<div
				class="flex flex-col h-48 px-4 py-5 mt-2 bg-white border border-gray-200 rounded-lg transition justify-evenly dark:bg-slate-800 dark:border-slate-600 sm:p-5 shadow-sm w-96"
			>
				<div class="transition -mt-1 mb-3">
					<label
						for="fullname"
						class="block text-sm font-medium text-gray-700 transition dark:text-slate-300"
					>
						Full Name
					</label>
					<div class="relative flex items-center mt-1">
						<input
							type="text"
							name="fullname"
							id="fullname"
							bind:value={textInput}
							class="transition shadow-sm dark:bg-slate-700 p-1.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:text-slate-200"
						/>
					</div>
				</div>
				<div />
				<div
					class="flex flex-row transition shadow-sm dark:bg-slate-700 p-1.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:text-slate-200"
				>
					<input
						class="mx-1.5"
						type="checkbox"
						id="sent-by-teacher"
						name="sent-by-teacher"
						bind:checked={sentByTeacher}
					/>
					<label
						for="sent-by-teacher"
						class="block w-full pr-12 border-gray-300 transition shadow-sm dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 sm:text-sm dark:border-slate-600 rounded-md dark:text-slate-200"
						>Sent by Teacher
					</label>
				</div>
				<div />
				<div
					class="transition mt-5 border-t border-gray-300 dark:border-slate-600 relative bg-gray-50 dark:bg-slate-700 -mx-5 px-5 py-3 -mb-5 rounded-b-md"
				>
					<div class="relative flex">
						<button
							type="button"
							class="group transition inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-blue-500 hover:border-blue-600 hover:text-blue-50 focus:outline-none dark:bg-slate-600 dark:border-slate-500 dark:text-slate-300 dark:hover:bg-sky-600 dark:hover:border-sky-500"
							on:click={() => {
								console.log(textInput)
								console.log(sentByTeacher)

								const timeData = timeCheck(scheduleCheck())

								console.log(timeData)

								axios.post('/api/v1/student/login', {
									student: {
										// TODO fix this
										firstname: 'test',
										lastname: 'test'
									},

									reason: findReason(timeData),
									date: Temporal.Now.plainTimeISO().round('second'),
									period: timeData.period
								})
								// if (device === 'QR') {
								// 	console.log(inputs)
								// 	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inputs))
								// 	event.preventDefault()
								// 	window.open('/confirm', '_self')
								// } else {
								// 	window.location.reload()
								// }
							}}
						>
							<!-- <HiUpload
								class="transition -ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-blue-200 dark:text-slate-400 dark:group-hover:text-sky-300"
								aria-hidden="true"
							/> -->
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
