import { decode } from 'base-64';

const decodeData = (i: string) => {
	try {
		return decode(i);
	} catch (err) {
		return 'invalid base64 string';
	}
};

const getToken = () => localStorage.getItem('library_admin_auth');

export { decodeData, getToken };
