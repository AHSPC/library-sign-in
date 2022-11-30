import Reason from "./reason.js"

export default function Reasons ({ reasons, reff }) {
	return (
	reasons.map(reason => {
		return <Reason className key={reason.id} reasonType={reason.name} reasonId={reason.id} reff={ reff } />
	})
)
}
