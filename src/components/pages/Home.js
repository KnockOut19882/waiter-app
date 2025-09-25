import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Tables:</h1>
      <ul>
        <li><Link to="/table/1">Table 1</Link></li>
        <li><Link to="/table/2">Table 2</Link></li>
        <li><Link to="/table/3">Table 3</Link></li>
        <li><Link to="/table/4">Table 4</Link></li>
        <li><Link to="/table/5">Table 5</Link></li>
        <li><Link to="/table/vip">Table VIP</Link></li>
      </ul>
    </div>
  );
}

export default Home;