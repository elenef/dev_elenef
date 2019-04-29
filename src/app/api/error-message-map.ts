import { HttpErrors } from './http-errors';

export interface ErrorMessageMap {
    [error: string]: string;
}
export const errorMessageMap: ErrorMessageMap = {
    [HttpErrors.unauthorized]: 'Для доступа к запрашиваемому ресурсу требуется аутентификация',
    [HttpErrors.notFound]: 'Запрашиваемый ресурс не существует',
    [HttpErrors.forbidden]: 'Нет доступа к запрашиваемому ресурсу'
};
export const defaultMessageError = 'Не удалось выполнить запрос';
