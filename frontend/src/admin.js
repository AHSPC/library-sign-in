import {useState, useEffect} from 'react'
import axios from 'axios'
import { JsonToTable } from 'react-json-to-table'
import {getData} from './getData'
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';

export default function Admin() {
	let [ tableData, setTableData ] = useState({})
	function dataMapper(element, index, array) {
		return {
			student: [element.student.firstname, element.student.lastname].join(" "),
			date: Temporal.PlainDateTime.from(element.date) .toLocaleString('en-US', { calendar: 'gregory', era: 'short', year: 'numeric', month: 'long', day: 'numeric' }),
			reason: element.reason,
			period: element.period
		}
	}
	useEffect(() => {
		getData(prompt("Please Enter Username:"), prompt("Please Enter Password:")).then(
			function (value) { setTableData(value.data.reverse().map(dataMapper)) },
			function (error) { setTableData(error) }
		)
	}, [])
	return (
		<div className="bg-white h-5/6 overflow-scroll" >
		<JsonToTable json={tableData}/>
		</div>
	)
}
