import { Contract } from './contract';

export interface ErrorResponse {
    message: string;
    details?: string;
}

export class ErrorRes extends Contract<ErrorRes> implements ErrorResponse {
    message: string;
    details?: string;

    constructor(data: ErrorRes) {
        super(data);
    }
}
