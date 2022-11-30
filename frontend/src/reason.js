export default function Reason ({ reasonType, reasonId, reff }) {
	return (
		<div>
		<input type="radio" id={ "reason" + reasonId } name="reason" value={ reasonId } ref={ reff } />
		<label htmlFor={ "reason" + reasonId }>{ reasonType }</label><br /><br />
		</div>

	)
}
