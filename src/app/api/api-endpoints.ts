import { BasicApiEndpoint } from './basic-api-endpoint';
import { environment } from '../../environments/environment';
import { ApiEndpoint } from './api-endpoint';

export class ApiEndpoints {
    static get baseUrl() {
        return environment.apiUrl;
    }

    static todos(): ApiEndpoint {
        return new BasicApiEndpoint(`${ApiEndpoints.baseUrl}/todos`);
    }
}
