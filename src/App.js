
import { Routes, Route } from 'react-router-dom';
import Table from './components/pages/Table';
import Home from './components/pages/Home';
import Container from 'react-bootstrap/Container';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import NotFound from './components/views/NotFound/NotFound';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}


export default App;
