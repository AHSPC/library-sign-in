// Form Wrapper

import { useState, useEffect, useRef } from 'react'
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import axios from 'axios'

// import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { HiUpload } from 'react-icons/hi'

const LOCAL_STORAGE_KEY = "librarySignIn.name"

export default function FormWrapper ({ device }) { // Device is a string telling you if it is from ipad or qr


	// Should be self explanatory
	let schedule = []
	let availableReasons = []

	const [inputs, setInputs] = useState({})

	const  nameInput = useRef(null)
	const  reasonInput = useRef(null)

	const placeholderName = "John Doe" // called when Form is submitted const confirmScreen = (event) => {

	const confirmScreen = (event) => {
		axios.post('/api/v1/student/login', {
			"student": {
				"firstname": inputs.firstname,
				"lastname": inputs.lastname,
			},
			"reason": findReason(timeCheck(scheduleCheck())),
			"date": Temporal.Now.plainTimeISO().round("second"),
			"period": timeCheck(scheduleCheck()).period,
		})
		if (device === "QR") {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inputs))
			event.preventDefault()
			window.open("/confirm", "_self")
		} else {
			window.location.reload()
		}
	}

	// Sets your default name in form from localStorage if you are logging in from qr 
	useEffect(() => { const storedName = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedName && device === "QR") { setInputs(storedName) }
	}, [])


	// Puts name to localStorage
	useEffect(() => {
		if (device === "QR") {
			if (inputs.firstname) {
				nameInput.current.value = [inputs.firstname, inputs.lastname].join(" ")
			}
		}
	}, [inputs])

	useEffect(() => {
		if (nameInput.current.value === " ") {
			nameInput.current.value = ""
		}
	}, [nameInput])

	// Called whenever name in form changes
	function handleChange(event) {
		const name = event.target.name
		const fullName = event.target.value.split(" ")
		if (fullName.length != 1) {
			setInputs(values => ({...values, ['firstname']: fullName[0]}))
			setInputs(values => ({...values, ['lastname']: fullName[1]}))
		}
	}


	// Finds todays schedule based on day of week
	function scheduleCheck () {
		let schedule = []
		const signIn = Temporal.Now.plainTimeISO().round({ smallestUnit: "minute" })
		const signInstant = Temporal.Now.instant().round({ smallestUnit: "minute" })
		// switch (new Date(new Temporal.Now.plainDateTimeISO().toString).getDay()) {
		const day = new Date((signInstant.toString())).getDay()



		switch (day) {
			case 1: 
				schedule = {
				name: "Monday",
				times: [
					Temporal.PlainTime.from({ hour: 8, minute: 30 }),  // 1st Period Start
					Temporal.PlainTime.from({ hour: 9, minute: 25 }),  // 2nd Period Start
					Temporal.PlainTime.from({ hour: 10, minute: 25 }), // 3rd Period Start
					Temporal.PlainTime.from({ hour: 11, minute: 25 }), // 4th Period Start
					Temporal.PlainTime.from({ hour: 12, minute: 15 }), // Lunch Start
					Temporal.PlainTime.from({ hour: 13, minute: 5 }),  // 5th Period Start
					Temporal.PlainTime.from({ hour: 14, minute: 0 }),  // 6th Period Start
					Temporal.PlainTime.from({ hour: 15, minute: 0 }),  // 7th Period Start
					Temporal.PlainTime.from({ hour: 15, minute: 50 }), // School End
					signIn
				].sort(Temporal.PlainTime.compare)
			}
				break
			case 2:
			case 4:
				schedule = {
					name: "A",
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }),  // 1st Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 15 }), // 3rd Period Start
						Temporal.PlainTime.from({ hour: 11, minute: 55 }), // Lunch Start
						Temporal.PlainTime.from({ hour: 12, minute: 40 }), // 5th Period Start
						Temporal.PlainTime.from({ hour: 14, minute: 25 }), // 7th Period Start
						Temporal.PlainTime.from({ hour: 16, minute: 0 }),  // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				}
				break
			case 3:
			case 5:
				schedule = {
					name: "B",
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }),   // 2nd Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 10 }),  // Advisory Start
						Temporal.PlainTime.from({ hour: 10, minute: 50	}), // 4th Period Start
						Temporal.PlainTime.from({ hour: 12, minute: 40	}), // Lunch Start
						Temporal.PlainTime.from({ hour: 13, minute: 25 }),  // 6th Period Start
						Temporal.PlainTime.from({ hour: 15, minute: 5 }),   // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				} 
				break
			default:
				// throw "It's the weekend go home"
				schedule = {
					times: [
						Temporal.PlainTime.from({ hour: 8, minute: 30 }),   // 2nd Period Start
						Temporal.PlainTime.from({ hour: 10, minute: 10 }),  // Advisory Start
						Temporal.PlainTime.from({ hour: 10, minute: 50	}), // 4th Period Start
						Temporal.PlainTime.from({ hour: 12, minute: 40	}), // Lunch Start
						Temporal.PlainTime.from({ hour: 13, minute: 25 }),  // 6th Period Start
						Temporal.PlainTime.from({ hour: 15, minute: 5 }),   // School End
						signIn
					].sort(Temporal.PlainTime.compare)
				}
		}
		return schedule
	}

	// Finds current period based on todays schedule
	function timeCheck (schedule) {
		const signIn = Temporal.Now.plainTimeISO().round({ smallestUnit: "minute" })
		const isSignIn = (value) => {
			return value.equals(signIn)
		}
		let rv = {}
		switch (schedule.times.findIndex(isSignIn)) {
			case 0:
				rv = {reasons: [{name: 'Before or After School', id:3}], period: 0}
				break
			case 1:
				if (schedule.name === "Monday" || schedule.name === "A") {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 1}
				} else {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 2}
				}
				break
			case 2:
				if (schedule.name === "Monday") { 
					rv = {reasons: [{name: 'Free Period', id:2}], period: 2}
				} else if (schedule.name === "A") {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 3}
				} else {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 0}
				}
				break
			case 3:
				if (schedule.name === "Monday") {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 3}
				} else if (schedule.name === "A") {
					rv = {reasons: [{name: 'Lunch', id:0}], period: 0}
				} else {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 4}
				}
				break
			case 4:
				if (schedule.name === "Monday") {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 4}
				} else if (schedule.name === "A") {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 5}
				} else {
					rv = {reasons: [{name: 'Lunch', id:0}], period: 0}
				}
				break
			case 5:
				if (schedule.name === "Monday") {
					rv = {reasons: [{name: 'Lunch', id:0}], period: 0}
				} else if (schedule.name === "A") {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 7}
				} else {
					rv = {reasons: [{name: 'Free Period', id:2}], period: 6}
				}
				break
			case 6:
				if (schedule.name === "Monday") {
					rv = {reasons: [{name: 'Lunch', id:0}], period: 0}
				} else if (schedule.name === "A") {
					rv = {reasons: [{name: 'Before or After School', id:3}], period: 0}
				} else {
					rv = {reasons: [{name: 'Before or After School', id:3}], period: 0}
				}
				break
			case 7:
				rv = {reasons: [{name: 'Free Period', id:2}], period: 6}
				break
			case 8:
				rv = {reasons: [{name: 'Free Period', id:2}], period: 7}
				break
			case 9:
				rv = {reasons: [{name: 'Before or After School', id:3}], period: 0}
				break
			default:
				throw "Temporal Archmage!"

		}
		return rv
	}

	const findReason = (time) => {
		let rv = 0
		if (reasonInput.current.checked) {
			rv = 1
		} else {
			rv = time.reasons[0].id
		}
		return rv 
	}

	// Finds period
	const time = timeCheck(scheduleCheck())

	// return  (
	// 	<>
	// 	<form className='form-wrapper' onSubmit={ confirmScreen }>
	// 	<div className='inputs-wrapper'>
	// 	<div className='name-input'>
	// 	<input className="first name" onChange={ handleChange } type="text" name="firstname" value={ inputs.firstname } ref={ firstnameInput } autoFocus />
	// 	<input className="last name" onChange={ handleChange } type="text" name="lastname" value={ inputs.lastname } ref={ lastnameInput } />
	// 	</div>
	// 	<div id='reason-input'>
	// 	<Reasons reasons={ time.reasons } reff={ reasonInput } />
	// 	</div>
	// 	<input type="hidden" name="date" value={ Temporal.Now.plainDateTimeISO().toString() } ref={ timeInput } />
	// 	<input type="hidden" name="period" value={ time.period } ref={ periodInput } />
	// 	</div>
	// 	<input className="submit" type="submit" />
	// 	</form>
	// 	</>
	// )
	//

	return (<>
		<div className='absolute top-2 right-2'> </div>
		<div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
		<div className='flex items-center justify-center h-screen'>
		<div>
		<h2 className='-mt-16 text-sm font-semibold text-gray-600 uppercase transition dark:text-slate-500'>login page</h2>
		<h1 className='-mt-1 text-3xl font-extrabold transition dark:text-slate-200'>AHS Library</h1>
		<div className='flex flex-col h-48 px-4 py-5 mt-2 bg-white border border-gray-200 rounded-lg transition justify-evenly dark:bg-slate-800 dark:border-slate-600 sm:p-5 shadow-sm w-96'>
		<div cla='transition -mt-1 mb-3'>
		<label htmlFor='fullname' className='block text-sm font-medium text-gray-700 transition dark:text-slate-300'> Full Name </label>
		<div className='relative flex items-center mt-1'>
		<input
		type='text'
		name='fullname'
		id='fullname'
		ref={ nameInput }
		defaultValue={ [inputs.firstname, inputs.lastname].join(" ") }
		onChange={ handleChange }
		autoFocus
		className='transition shadow-sm dark:bg-slate-700 p-1.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:text-slate-200' />
		<div className='transition absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
		<kbd className='inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded transition dark:text-slate-400 dark:border-slate-600'>
		tab
		</kbd>
		</div>
		</div>
		</div>
		<div />
		<div className='flex flex-row transition shadow-sm dark:bg-slate-700 p-1.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:text-slate-200' >
		<input className='mx-1.5' type="checkbox" id='sent-by-teacher' name='sent-by-teacher' value={ 1 } ref={reasonInput} />
		<label htmlFor='sent-by-teacher' className='block w-full pr-12 border-gray-300 transition shadow-sm dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 sm:text-sm dark:border-slate-600 rounded-md dark:text-slate-200' >Sent by Teacher </label>
		</div>
		<div />
		<div tw='transition mt-5 border-t border-gray-300 dark:border-slate-600 relative bg-gray-50 dark:bg-slate-700 -mx-5 px-5 py-3 -mb-5 rounded-b-md'>
		<div tw='relative flex'>
		<button
		type='button'
		className='group transition inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-blue-500 hover:border-blue-600 hover:text-blue-50 focus:outline-none dark:bg-slate-600 dark:border-slate-500 dark:text-slate-300 dark:hover:bg-sky-600 dark:hover:border-sky-500'
		onClick={ confirmScreen }>
		<HiUpload className='transition -ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-blue-200 dark:text-slate-400 dark:group-hover:text-sky-300' aria-hidden='true' />
		Submit
		</button>
		</div>
		</div>
		</div>
		</div>
		</div>
		</div>
		</>
	)
}
