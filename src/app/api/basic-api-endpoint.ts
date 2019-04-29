import { ApiEndpoint } from './api-endpoint';

export class BasicApiEndpoint implements ApiEndpoint {
    constructor(private url: string) {
    }

    listUrl(): string {
        return this.url;
    }

    itemUrl(id: string): string {
        return `${this.url}/${id}`;
    }

}

