export interface ApiEndpoint {
    listUrl(): string;
    itemUrl(id: string): string;
}
