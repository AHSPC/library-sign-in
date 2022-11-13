import ky from 'ky';

interface StudentResponse {
	student: {
		firstname: string;
		lastname: string;
	};
	date: string;
	period: number;
	reason: string;
}

const studentSignOn = (firstname: string, lastname: string, period: number, reason: number) => {
	return ky.post('/api/v1/student/login', { json: { student: { firstname, lastname }, period, reason } }).json();
};

export { studentSignOn, StudentResponse };
