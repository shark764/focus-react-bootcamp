import React, { useEffect, useState } from 'react';
import ClassExample from '../Components/ClassExample';
import ClassWithLifeCycleExample from '../Components/ClassWithLifeCycleExample';
import ClassWithStateExample from '../Components/ClassWithStateExample';
import FunctionExample from '../Components/FunctionExample';
import FunctionWithStateExample from '../Components/FunctionWithStateExample';
import JSXExample from '../Components/JSXExample';

function Main() {
  const [clear, setClear] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClear(true);
    }, 16000);
  }, []);

  return (
    <>
      <div className="App-examples">
        <ClassExample />
        <ClassWithStateExample />
        {!clear && <ClassWithLifeCycleExample />}
        <FunctionExample />
        {!clear && <FunctionWithStateExample />}
      </div>

      <div className="App-examples">
        <JSXExample />
      </div>
    </>
  );
}

export default Main;
