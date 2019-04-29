export const errorIndexCode = -1;

/**
 * функция для глубокого копирования любого JSON-валидного объекта
 * @param object - объект для копирования
 * @param type - тип объекта
 */
export function cloneDeep<T>(object: T, type?: { new(value): T }): T {
    return type
        ? object && new type(JSON.parse(JSON.stringify(object)))
        : object && JSON.parse(JSON.stringify(object));
}

/**
 * функция для глубокого копирования массива любых JSON-валидного объектов
 * @param list - массив для копирования
 * @param type - тип объекта
 */
export function cloneDeepArray<T>(list: T[], type?: { new(value): T }): T[] {
    return list.map(item => {
        return cloneDeep<T>(item, type);
    });
}

/**
 * функция для обновления элемента массива
 * @param list - массив
 * @param newItem - элемент массива
 */
export function updateItemArray<T extends Model>(list: T[], newItem: T): T[] {
    const res = cloneDeepArray<T>(list);
    const index =  res.findIndex(item => item.id === newItem.id);

    // tslint:disable-next-line:no-unused-expression
    index !== errorIndexCode && (res[index] = newItem);

    return res;
}
