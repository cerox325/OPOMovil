import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import ProductsScreen from './screens/Products'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import  AuthLoading from './screens/AuthLoading'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Modales from './screens/Modales'
import Search from './screens/Search'
import Porfile from './screens/Porfile'


const OnBordingNavigation = createStackNavigator({
  Iniciar_Seccion: LoginScreen,
  Registrate: RegisterScreen
},{
    initialRouteName: 'Iniciar_Seccion'
  }
) 

const AppNavigatior = createStackNavigator({
  Products: {
    screen : ProductsScreen,
  }
}
,
  {
    initialRouteName: 'Products'
  }
)

const RootStack = createStackNavigator({
  Main: AppNavigatior,
  Modal: Modales,
},
{
  mode:'modal',
  headerMode: 'none',
})



const BaseStack = createSwitchNavigator({
  AuthLoading,
  OnBording: OnBordingNavigation,
  RootStack: RootStack,
}
,
  {
    initialRouteName: 'AuthLoading'
  }
)

const NewStack = createBottomTabNavigator({
  Home: RootStack
},{
  initialRouteName: 'Home'
})

export default createAppContainer(BaseStack)
