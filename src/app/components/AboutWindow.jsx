import React from 'react'

const AboutWindow = () => {
  return (
    <div className="card">
        <div className="aboutTitle">About</div>
        <div className="cardHeader">
            <h1>Oscar Rapale Méndez</h1>
            <p>
                Fullstack Web Developer, Frontend Specialist, Creative Coder <br />
                From Puerto Rico
            </p>
            <img src="" alt="" />
        </div>
        <div className="cardbody">
            <p>
                Hello World! I'm Oscar, a web developer and creative coder! <br />
                As a Fullstack Developer specialized in Front-end work my skills can cover:
            </p>
            <ul>
                <li>Web Development/Design</li>
                <li>App Development</li>
                <li>Frontend Dynamic Designs</li>
                <li>Backend Development</li>
                <li>Gamification of Apps</li>
            </ul>
            <h2>Education</h2>
            <p>
                Holberton Coding School Puerto Rico <br />
                Certificate: Foundations of Computer Science and Software Engineering <br />
                2024
            </p>
            <h2>Other Interests</h2>
            <ul>
                <li>Studying new topics</li>
                <li>Game Development</li>
                <li>UI/UX Enthusiast</li>
                <li>Learning to do Concept Art</li>
            </ul>
        </div>
    </div>
  )
}

export default AboutWindow
