import { createConnection } from 'mysql';
import {HOST, USER, PASSWORD} from './secrets'
import { DATABASE } from "./constants";

export class Database {
    constructor() {
        this.connection = createConnection({
            host : HOST,
            port : 3306,
            user : USER,
            password : PASSWORD,
            database : DATABASE
        });
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
