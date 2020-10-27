// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {GenericClient, getOrCreateApiClient} from './ApiClient';
import {getOrCreateWebSocketClient} from './WebSocketClient';

export default new GenericClient();
export {
    getOrCreateApiClient,
    getOrCreateWebSocketClient,
};
