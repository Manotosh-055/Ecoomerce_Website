import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
const About = () => {
  return (
    <>
    <Meta title="About Us" />
    <BreadCrumb title="About Us"/>
    <Container class1="policy-wrapper py-3 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="policy">
                        
                    </div>
                </div>
            </div>
      
      </Container>
    </>
  );
}

export default About;
