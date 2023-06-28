export type OAuthSlice = {
    loading: boolean;
    error: string | null;
};

export type OAuthServiceRequestData = {
    redirect_uri: string;
};

export type OAuthLoginRequestData = {
    code: string;
    redirect_uri: string;
};
