//Componentes esenciales para configurar el enrutamiento en una aplicación React.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LandingContainer from './Components/Landing/landing';
import Home from './Components/Home/Home';
import DogDetail from './Components/Detail/DogDetail';
import About from '../src/Components/About/About';
import CreateDog from './Components/Form/CreateDog';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route data-testid="landing-container" exact path='/' element={<LandingContainer />} />
        <Route data-testid="home-component" path='/home' element={<Home />} /> 
        <Route data-testid="dog-detail-component" path='/dogs/:id' element={<DogDetail />} /> 
        <Route data-testid="create-dog-component" path='/newDog/' element={<CreateDog />} />
        <Route data-testid="about-component" path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
