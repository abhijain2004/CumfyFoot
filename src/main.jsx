import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import webStore,{ persistor }  from './store/index.js'
import { RouterProvider,createBrowserRouter} from "react-router-dom"
import FilteredProducts from './components/FilteredProducts'
import ItemSpecification from './components/ItemSpecification'
import { PersistGate } from 'redux-persist/integration/react';
import NavBarSpecification from './components/NavBarSpecification.jsx'
import NavItem from './components/NavItem.jsx'
import SignUp from './components/SignUp.jsx'
import SearchScreen from './components/SearchScreen.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Provider store={webStore}>
    <App />
    </Provider>,
  },
  {
    path:"/filteredProducts/:type",element:<Provider store={webStore}>
    <FilteredProducts></FilteredProducts>
    </Provider>
    },
    {
      path:"/filteredProducts/:type/:id",element:<Provider store={webStore}>
      <ItemSpecification></ItemSpecification>
    </Provider>
    },
    {
      path:"/Cumfy/:type",element:<Provider store={webStore}>
      <NavBarSpecification></NavBarSpecification>
    </Provider>
    },
    {
      path:"/Cumfy/:type/:id",element:<Provider store={webStore}>
      <NavItem></NavItem>
    </Provider>
    },
    {
      path:"/signUp",element:<Provider store={webStore}>
      <SignUp></SignUp>
    </Provider>
    },
    {
      path:"/searchedItem",element:<Provider store={webStore}>
      <SearchScreen></SearchScreen>
    </Provider>
    }


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
<PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
</RouterProvider>
    
  </StrictMode>,
)
