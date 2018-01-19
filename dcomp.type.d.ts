import {Document} from "mongoose";
import {RSocketResponse} from './src/models/response-socket.model';

export declare type StoreResponse = RSocketResponse | Document | Document[] | void;
