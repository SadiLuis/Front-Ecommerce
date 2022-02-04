import { Container } from 'react-bootstrap';
import ListProducts from '../../components/ListProducts/ListProducts'

import './styles.css';

const Home = () => {
    return (
        <Container className='mt-3 '>
            <ListProducts />
        </Container>
    )
}

export default Home;
