import { Routes, Route } from 'react-router';
import Navigation from './routes/navigation/Navigation';
import Home from './routes/home/Home';
import Authentication from './routes/authentication/Authentication';
const Shop = () => <h1>This is the SHOP page!!!</h1>;

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/auth' element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
