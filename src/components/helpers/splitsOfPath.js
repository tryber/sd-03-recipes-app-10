import { useHistory } from 'react-router';

export const typeRequsition = useHistory().location.pathname.split('/')[1];
export const itemId = useHistory().location.pathname.split('/')[2];
