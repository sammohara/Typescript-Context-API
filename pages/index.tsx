import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/Home.module.css';

export default function Login() {
  const router = useRouter();

  const { user, login, contextValue } = useAppContext();
  // const { state, dispatch } = contextValue;

  // console.log('State information: ', state, dispatch);

  const { clientId } = contextValue.state;

  // console.log('Client Id: ', clientId);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const testContext = () => {
    console.log(`Logging in... ${username} ${password}`);

    if (username === undefined || username == '') return;
    if (password === undefined || password == '') return;

    // login(); // This is what sets the difference... Instantiate the state.
    contextValue.dispatch({ type: 'assign_client_id', value: username });

    console.log('Updated ClientId: ', clientId);

    router.push('home');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login screen App</title>
      </Head>
      <h1>Login to App:</h1>
      <hr />
      <h2>Username:</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <h2>Password:</h2>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <hr />
      <button onClick={() => testContext()}>Submit</button>
    </div>
  );
}
