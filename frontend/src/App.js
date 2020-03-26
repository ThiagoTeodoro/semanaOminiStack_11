import React, { useState } from 'react';

import Header from './Header';

function App() {

  const [counter, setCounter] = useState(0);

  function increment(){
    setCounter(counter +1);
  }

  return (
    <>
      <Header>
        Contador : {counter}
      </Header>
      <button onClick={increment}>
        Incrementar
      </button>
    </>
  );
}

export default App;
