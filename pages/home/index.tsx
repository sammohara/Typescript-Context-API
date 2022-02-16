import { useRouter } from 'next/router';
import { useAppContext } from '../../context/AppContext';

export default function Home() {
  const router = useRouter();
  // const { user, login, contextValue } = useAppContext();
  const { state, dispatch } = useAppContext();
  // console.log('Page 2 state values: ', state, dispatch);
  const { clientId } = state;

  console.log('Page refresh ClientID: ', clientId);

  const logOutUser = () => {
    // logout();
    router.back();
  };
  return (
    <div>
      <body>
        <p>
          <strong>Welcome back to the platform:</strong>
        </p>
        <p>
          Username is:
          <br />
          Password is:
          <br />
          Logged in: {clientId}
        </p>
        <button onClick={() => logOutUser()}>Logout</button>
      </body>
    </div>
  );
}
