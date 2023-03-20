import {useState, useEffect} from 'react'
import axios from 'axios'
import { JsonToTable } from 'react-json-to-table'
import {getData} from './getData'
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';

export default function Admin() {
	let [ tableData, setTableData ] = useState({})
	function dataMapper(element, index, array) {
    let date = new Date(element.date).toDateString();
    return {
      student: [element.student.firstname, element.student.lastname].join(" "),
      date: date,
      reason: element.reason,
      period: element.period,
    };
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
