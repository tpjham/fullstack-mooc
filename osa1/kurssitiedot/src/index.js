import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return ( 
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return ( 
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return ( 
    <div>
      <Part osa={props.content[0]}/>
      <Part osa={props.content[1]}/>
      <Part osa={props.content[2]}/>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.osa.name}  {props.osa.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
      </p>
    </div>
  );
};


ReactDOM.render(<App/>, document.getElementById("root"));