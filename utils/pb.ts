import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './pocketbase-types';
var path = '';
if (import.meta.env.MODE === 'development')
    path = 'https://tavue.arthurwicky.fr/';
else if (import.meta.env.MODE === 'production')
    path = 'https://pb.arthurwicky.fr/';
console.log('PocketBase path:', path);
const pb = new PocketBase(path) as TypedPocketBase;
export default pb;
