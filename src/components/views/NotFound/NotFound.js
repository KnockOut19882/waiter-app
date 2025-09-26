import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NotFound = () => (
  <div className="text-center">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Button as={Link} to="/" variant="dark">Go to Home</Button>
  </div>
);

export default NotFound;