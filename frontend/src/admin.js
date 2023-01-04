import { JsonToTable } from 'react-json-to-table'

export default function Admin() {
	const getData = () => {
		// Sajjaad you write this bit please I give up
		return {"placeholder": "lol"}
	}
	let data = getData()
	return (<JsonToTable json={data}/>)
}
