/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Core from './src/router/Core.router';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Core);
