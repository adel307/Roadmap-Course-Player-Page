export function getPlaylistId(url: string | null | undefined): string {
    if (url){
        const parsedUrl = new URL(url);
        const PlaylistId = parsedUrl.searchParams.get('list')
        if(PlaylistId){
            return PlaylistId;
        }
        throw new Error(`can not find PlaylistId for url ${url}`);
    }
    throw new Error(`No url found ${url}`);
}