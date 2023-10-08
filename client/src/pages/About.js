import React from 'react'
import Layout from '../components/layout/Layout.js'

const About = (props) => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 d-flex justify-content-end justify-content-sm-center align-items-center">
          <img
            src="/images/aboutUs.jpg"
            alt="contactus"
            style={{ width: "80%", height: '70%', paddingTop: '70px'}}
          />
        </div>
        <div className="col-md-4">
          <h1 style={{fontFamily: 'Poppins'}}>About Us</h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About