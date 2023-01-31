import {useState, useEffect} from 'react'
import axios from 'axios'
import { JsonToTable } from 'react-json-to-table'
import {getData} from './getData'
import Histogram from 'react-chart-histogram';

export default function Chart() {
	const labels = ['2016', '2017', '2018'];
	const data = [324, 45, 672];
	const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
	let [ tableData, setTableData ] = useState({})
	useEffect(() => {
		getData('php', 'sucks').then(
			function (value) { setTableData(value.data.reverse()) },
			function (error) { setTableData(error) },
		)
	}, [])
	return (
		<div className="bg-white h-5/6 overflow-scroll" >
		<Histogram
		    xLabels={labels}
		    yValues={data}
		    width='400'
		    height='200'
		    options={options}
		/>
		</div>
	)
	}
