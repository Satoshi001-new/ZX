import { useEffect } from "react";
import useTelegramAuth from "./hooks/useTelegramAuth";
import { saveProfile } from "./api/saveProfile";

function App() {
  const user = useTelegramAuth();

  useEffect(() => {
    if (user) {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          saveProfile(user, data.country_code);
        });
    }
  }, [user]);

  return (
    <div>
      {user ? <h2>Welcome {user.first_name}!</h2> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
