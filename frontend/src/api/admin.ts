import ky from 'ky';

interface AdminInteraction {
	auth: (username: string, password: string) => void;
	list: (token: string) => <T = unknown>() => Promise<T>;
	logout: () => void;
}

const admin: AdminInteraction = {
	auth: (username: string, password: string) => {
		ky.post('/api/v1/admin/login', { json: { username, password } }).then((res: any) => {
			localStorage.setItem('library_admin_auth', res.token);
		});
	},
	list: (token: string) => ky.get('/api/v1/admin/list', { headers: { Authorization: `Bearer ${token}` } }).json,
	logout: () => localStorage.removeItem('library_admin_auth'),
};

export { admin };

// logout: window.location.reload();
