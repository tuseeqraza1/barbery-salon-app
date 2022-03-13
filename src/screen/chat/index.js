import Main from './Main';
import Chat from './Chat';
import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

const navigator = createStackNavigator({
  // Main: {screen: Main},
  Chat: {screen: Chat},
});

export default createAppContainer(navigator);
