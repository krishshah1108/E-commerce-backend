import Users from './user/index.js';
import Company from './company/index.js';


const routes = [
    {path: '/users', file: Users},
    {path: '/company', file: Company}
];

export default routes 
