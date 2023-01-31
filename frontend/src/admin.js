import {useState, useEffect} from 'react'
import axios from 'axios'
import { JsonToTable } from 'react-json-to-table'
import {getData} from './getData'

export default function Admin() {
	let [ tableData, setTableData ] = useState({})
	useEffect(() => {
		getData('php', 'sucks').then(
			function (value) { setTableData(value.data.reverse()) },
			function (error) { setTableData(error) },
		)
	}, [])
	return (
		<div className="bg-white h-5/6 overflow-scroll" >
		<JsonToTable json={tableData}/>
		</div>
	)
	}
