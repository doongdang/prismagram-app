import { createStackNavigator } from "@react-navigation/stack";
import Message from "../screens/Message/Message";
import Messages from "../screens/Message/Messages";

const MessageNavigation = createStackNavigator();

export default () => {
  <MessageNavigation.Navigator>
    <MessageNavigation.Screen name="Message" component={Message} />
    <MessageNavigation.Screen name="Messages" component={Messages} />
  </MessageNavigation.Navigator>;
};
