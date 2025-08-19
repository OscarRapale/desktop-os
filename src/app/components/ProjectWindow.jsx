import React from "react";

const ProjectWindow = () => {
  return (
    <div className="card">
      <div className="projectTitle">Projects</div>
      <div className="cardBody">
        <div className="skills">
          <ul className="skillList">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>SCSS</li>
            <li>Framer Motion</li>
            <li>ChakraUI</li>
            <li>MongoDB</li>
            <li>PostreSQL</li>
            <li>Python</li>
          </ul>
        </div>

        <div className="tools">
          <ul className="toolList">
            <li>Figma</li>
            <li>Canva</li>
            <li>Prismic</li>
            <li>Trello</li>
          </ul>
        </div>

        <div className="work">
          <h2>Projects</h2>
          <div className="theLine">
            <h2>The Line - Tribute to The Bear TV Series</h2>
            <img src="" alt="" />
            <p>
              A modern, responsive restaurant website for "The Line", a fine
              dining establishment in Chicago's River North neighborhood. Built
              with vanilla HTML, CSS, and JavaScript, featuring elegant design,
              smooth animations, and comprehensive responsive layouts. A tribute
              to the tv show "The Bear". <br />
              <a href="">Visit The Line</a>
            </p>
          </div>
          <div className="shellfolio">
            <h2>Shell Style Porfolio</h2>
            <img src="" alt="" />
            <p>
              A portfolio website that simulates a terminal interface, built
              with vanilla JavaScript, HTML, and CSS. Experience my professional
              information through command-line interactions! <br />
              <a href="">Visit my Shell Style Portfolio</a>
            </p>
          </div>
          <div className="simplePortfolio">
            <h2>Simple HTML/CSS Porfolio</h2>
            <img src="" alt="" />
            <p>
              This is my personal portfolio website built with HTML, designed to
              present my work and capabilities as a developer. The portfolio
              serves as a digital resume and project showcase. Including smooth
              animations. <br />
              <a href="">Visit My Portfolio</a>
            </p>
          </div>
          <div className="janCuts">
            <h2>Jan Cuts Porfolio</h2>
            <img src="" alt="" />
            <p>
              A portfolio website that was requested by a professional barber
              that wanted to showcase his work and skills and the services he is
              offering. The website is made with React.js and Chakra UI, and the
              UI was designed with Figma. <br />
              <a href="">Visit Jan Cuts</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWindow;
