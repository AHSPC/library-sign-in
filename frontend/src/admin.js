import {useState} from 'react'
import axios from 'axios'
import { JsonToTable } from 'react-json-to-table'

export default function Admin() {
	let [ tableData, setTableData ] = useState({})
	const getData = async (username, password) => await ( await fetch("/api/v1/admin/list", { method: "GET", headers: { Authorization: `Bearer ${ ( await ( await fetch("/api/v1/admin/login", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ username: username, password: password, }), })).json()).token }`, }, })).json()
	const data = getData('php', 'sucks').then(
		function (value) { setTableData(value) },
		function (error) { setTableData(error) },
	)
	console.log(tableData)
	return (<JsonToTable json={tableData}/>)
}