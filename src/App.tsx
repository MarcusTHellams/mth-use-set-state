import {
  randAddress,
  randFullName,
  randNumber,
  randState,
} from '@ngneat/falso';
import { useEffect } from 'react';

import { useSetState } from '../lib';

const original = {
  name: 'John Wick',
  age: 58,
  occupation: 'Bad Ass Assassin',
  address: {
    street: '12345 Main Street',
    city: 'Any City',
    state: 'Texas',
    zip: 75001,
  },
  languages: ['javascript', 'typescript', 'node', 'mysql'],
};

function App() {
  const [state, setState, { clearState, resetState }] = useSetState(
    () => original
  );

  useEffect(() => {
    console.log('state.address.state: ', state?.address?.state);
  }, [state?.address?.state]);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div>
        <button
          onClick={() => {
            setState({ address: { state: randState() } });
          }}
        >
          Update
        </button>
        <button
          onClick={() => {
            resetState();
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            clearState();
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setState(({ age }) => ({ age: age + 1 }));
          }}
        >
          Increase Age
        </button>
        <button
          onClick={() => {
            const address = randAddress();
            setState(() => ({
              name: randFullName(),
              age: randNumber({ max: 100 }),
              address: {
                street: address.street,
                city: address.city,
                zip: +address.zipCode,
              },
            }));
          }}
        >
          Random Everything
        </button>
        <button
          onClick={() => {
            setState(({ languages }) => {

              return {
                languages: languages.concat('php', 'javas'),
              };
            });
          }}
        >
          Set Languages
        </button>
      </div>
    </div>
  );
}

export default App;
