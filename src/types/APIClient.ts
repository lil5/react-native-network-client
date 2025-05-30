// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type { EmitterSubscription } from "react-native";
import type { RetryTypes } from "../APIClient/NativeApiClient";

export interface ProgressPromise<T> extends Promise<T> {
    progress?: (
        callback: (
            fractionCompleted: number,
            bytesRead?: number | null,
        ) => void,
    ) => ProgressPromise<T>;
    onProgress?: (
        fractionCompleted: number,
        bytesRead: number | null | undefined,
    ) => void;
    cancel?: () => void;
}

export type ClientHeaders = Record<string, string>;

export type RequestOptions = {
    headers?: ClientHeaders;
    body?: Record<string, unknown> | string;
    timeoutInterval?: number;
    retryPolicyConfiguration?: RetryPolicyConfiguration;
};

export type MultipartUploadConfig = {
    fileKey?: string;
    data?: Record<string, string>;
};

export type UploadRequestOptions = RequestOptions & {
    skipBytes?: number;
    method?: string;
    multipart?: MultipartUploadConfig;
};

export type ClientResponseMetrics = {
    networkType: string;
    tlsCipherSuite: string;
    tlsVersion: string;
    httpVersion: string;
    isCached: boolean;
    compressedSize: number;
    size: number;
    startTime: number;
    endTime: number;
    connectionTime: number;
    latency: number;
    speedInMbps: number;
};

export type ClientResponse = {
    headers?: ClientHeaders;
    data?: Record<string, unknown>;
    code: number;
    redirectUrls?: string[];
    ok: boolean;
    retriesExhausted?: boolean;
    path?: string;
    metrics?: ClientResponseMetrics;
};

export type ClientResponseError = {
    code: number;
    message: string;
    domain: string;
    userInfo?: Record<string, unknown>;
    nativeStackAndroid?: unknown[];
    nativeStackIOS?: unknown[];
};

export type APIClientErrorEventHandler = (event: APIClientErrorEvent) => void;

export interface GenericClientInterface {
    head(url: string, options?: RequestOptions): Promise<ClientResponse>;
    get(url: string, options?: RequestOptions): Promise<ClientResponse>;
    put(url: string, options?: RequestOptions): Promise<ClientResponse>;
    post(url: string, options?: RequestOptions): Promise<ClientResponse>;
    patch(url: string, options?: RequestOptions): Promise<ClientResponse>;
    delete(url: string, options?: RequestOptions): Promise<ClientResponse>;
}

export interface APIClientInterface {
    baseUrl: string;
    config: APIClientConfiguration;

    onClientErrorSubscription?: EmitterSubscription;
    onClientError(callback: APIClientErrorEventHandler): void;

    head(endpoint: string, options?: RequestOptions): Promise<ClientResponse>;
    get(endpoint: string, options?: RequestOptions): Promise<ClientResponse>;
    put(endpoint: string, options?: RequestOptions): Promise<ClientResponse>;
    post(endpoint: string, options?: RequestOptions): Promise<ClientResponse>;
    patch(endpoint: string, options?: RequestOptions): Promise<ClientResponse>;
    delete(endpoint: string, options?: RequestOptions): Promise<ClientResponse>;
    upload(
        endpoint: string,
        fileUrl: string,
        options?: UploadRequestOptions,
    ): ProgressPromise<ClientResponse>;
    download(
        endpoint: string,
        filePath: string,
        options?: RequestOptions,
    ): ProgressPromise<ClientResponse>;

    getHeaders(): Promise<ClientHeaders>;
    addHeaders(headers: ClientHeaders): Promise<void>;
    importClientP12(path: string, password?: string): Promise<void>;
    invalidate(): Promise<void>;
}

export type ClientP12Configuration = {
    path: string;
    password?: string;
};

export type SessionConfiguration = {
    allowsCellularAccess?: boolean;
    waitsForConnectivity?: boolean;
    timeoutIntervalForRequest?: number;
    timeoutIntervalForResource?: number;
    httpMaximumConnectionsPerHost?: number;
    cancelRequestsOnUnauthorized?: boolean;
    trustSelfSignedServerCertificate?: boolean;
    collectMetrics?: boolean;
};

export type RetryPolicyConfiguration = {
    type?: RetryTypes;
    retryLimit?: number;
    retryInterval?: number;
    exponentialBackoffBase?: number;
    exponentialBackoffScale?: number;
    statusCodes?: number[];
    retryMethods?: string[];
};

export type RequestAdapterConfiguration = {
    bearerAuthTokenResponseHeader?: string;
};

export type APIClientConfiguration = {
    headers?: ClientHeaders;
    sessionConfiguration?: SessionConfiguration;
    retryPolicyConfiguration?: RetryPolicyConfiguration;
    requestAdapterConfiguration?: RequestAdapterConfiguration;
    clientP12Configuration?: ClientP12Configuration;
};

export type ProgressEvent = {
    taskId: string;
    fractionCompleted: number;
    bytesRead?: number | null;
};

export type MissingClientCertificateEvent = {
    serverUrl: string;
};

export type APIClientErrorEvent = {
    serverUrl: string;
    errorCode: number;
    errorDescription: string;
};
