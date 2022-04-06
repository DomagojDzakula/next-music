import { getProviders, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <div className="login-container">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Login in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
