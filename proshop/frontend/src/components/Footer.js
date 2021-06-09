import React from 'react'
import { Container, Row, Col } from 'react-bootstrap' // Row and Col is apart of the bootstrap grid

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ProShop</Col>    // py is padding on the y-axis
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
