import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/components/App';

//styles
import '@/assets/styles/main.css';

//render
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
