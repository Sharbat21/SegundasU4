import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

// Importar pantallas
import SplashScreen from './screens/SplashScreen';
import PostsListScreen from './screens/PostsListScreen';
import ViewPostScreen from './screens/ViewPostScreen';
import AddPostScreen from './screens/AddPostScreen';
import HamburgerMenu from './components/HamburgerMenu';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack para Posts
function PostsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db', // Color azul para la barra
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="PostsList" 
        component={PostsListScreen} 
        options={{ title: 'Posts List' }}
      />
      <Stack.Screen 
        name="ViewPost" 
        component={ViewPostScreen} 
        options={{ title: 'View Post' }}
      />
      <Stack.Screen 
        name="AddPost" 
        component={AddPostScreen} 
        options={{ title: 'Add Post' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Mostrar splash screen por 3 segundos
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="PostsStack"
          drawerContent={(props) => <HamburgerMenu {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#2c3e50', // Color oscuro para el drawer
              width: 240,
            },
            drawerActiveTintColor: '#3498db',
            drawerInactiveTintColor: '#ecf0f1',
            headerShown: false,
          }}
        >
          <Drawer.Screen 
            name="PostsStack" 
            component={PostsStack} 
            options={{ drawerLabel: 'Home' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}