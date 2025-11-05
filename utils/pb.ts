import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './pocketbase-types';
var path = '';
if (import.meta.env.MODE === 'developpement')
    path = 'http://localhost:8090'
const pb = new PocketBase(path) as TypedPocketBase;
export default pb;
