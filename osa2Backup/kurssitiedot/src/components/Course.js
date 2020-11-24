import React from "react";

const Course = (props) => {
  
  return ( 
    <div>
        {props.course.map( course => 
        <div key={course.name}>
          <Header course={course.name} />
          <Content content={course.parts} />
          <Total total={course.parts} />
        </div>
        )}
    </div>
  )
};

const Header = (props) => {
  return ( 
    <div>
      {<h1>{props.course}</h1>}
    </div>
  );
};

const Content = (props) => {
  
  return ( 
    <div>
      {props.content.map(osa =>
      <div key={osa.name}>
        <Part name={osa.name} exercises={osa.exercises} />
      </div>  
      )}
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name}  {props.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  
  const total = props.total.reduce( ( acc, cur) => {
    
    return acc += cur.exercises
  }, 0)
  
  
  return (
    <div>
      <h4>
        Number of exercises {total}
      </h4>
    </div>
  );
};

export default Course;