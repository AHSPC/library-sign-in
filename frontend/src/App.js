import FormWrapper from './form-wrapper.js'
// import logo from './logo.svg';
import './App.css';

function App({ device }) {
	return (
		<div className="App">
			<FormWrapper device={ device } />
		</div>
	);
}

export default App;
