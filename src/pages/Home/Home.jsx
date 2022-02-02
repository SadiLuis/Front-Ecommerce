import { Container } from 'react-bootstrap';
import ListProducts from '../../components/ListProducts/ListProducts'

import './styles.css';

function Home() {
    return (
        <Container className='mt-3 home'>
            <ListProducts />
        </Container>
    );
}

export default Home;
