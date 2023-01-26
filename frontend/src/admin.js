import {useState} from 'react'
import axios from 'axios'
import { JsonToTable } from 'react-json-to-table'

export default function Admin() {
	let [ tableData, setTableData ] = useState({})
	const data = axios.get('/api/v1/admin/list', {headers: {Authorization: `Bearer ${axios.post("/api/v1/admin/login", {"headers": {"Content-Type": "application/json"}})}`}}).then(
		function (value) { setTableData(value.response.data) },
		function (error) { setTableData(error.response.data) },
	)
	// const getData = async (username, password) => await ( await fetch("/api/v1/admin/list", { method: "GET", headers: { Authorization: `Bearer ${ ( await ( await fetch("/api/v1/admin/login", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ username: username, password: password, }), })).json()).token }`, }, })).json()
	console.log(tableData)
	return (<JsonToTable json={tableData}/>)
}
