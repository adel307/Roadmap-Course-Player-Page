export function getPlaylistId(url: string | null | undefined): string | null {
    try {
        if (url){
            const parsedUrl = new URL(url);
            return parsedUrl.searchParams.get('list');
        }
        return 'No url found';
    } catch (e) {
        return null;
    }
}