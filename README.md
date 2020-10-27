# react-native-network-client

Configurable network clients for React Native. Uses Alamofire for iOS and OkHttp for Android.

## Installation

```sh
npm install react-native-network-client
```

## Usage

```js
import GenericClient, {getOrCreateApiClient, getOrCreateWebSocketClient} from "react-native-network-client";

// ...

const response = await GenericClient.get("https://community.mattermost.com");
const apiClient = await NetworkClient.getOrCreateApiClient("https://community.mattermost.com");
const wsClient = await NetworkClient.getOrCreateWebSocketClient("wss://community.mattermost.com");
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
