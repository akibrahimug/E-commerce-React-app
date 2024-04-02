import Home from './routes/home/home.routes'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.routes'
import Authentication from './routes/authenticate/auth.routes'
import Shop from './routes/shop/shop.routes'
import Checkout from './routes/checkout/checkout.routes'
import { useEffect } from 'react'
import { checkUserSession } from './store/user/user.action'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='signin' element={<Authentication />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
