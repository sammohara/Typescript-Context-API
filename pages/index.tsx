import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login screen App</title>
      </Head>
      <body>
        <h1>Login to App:</h1>
        <hr />
        <h2>Username:</h2>
        <input />
        <h2>Password:</h2>
        <input />
        <hr />
        <button onClick={() => alert('Working!')}>Submit</button>
      </body>
    </div>
  );
}
