export interface CountryChannelsAPIJson {
    countryChannels: Map<string, Array<string>>
}

export interface TvChannelApi {
    tvChannel: {
        name: string;
        id: number;
    };
    upvote: number;
    downvote: number;
}