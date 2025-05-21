import { useState } from "react";
import UserForm from "./components/UserFrom";
import UserList from "./components/UserList";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        User Management Panel
      </h1>

      <UserForm onUserAdded={triggerRefresh} />
      <div className="mt-10">
        <UserList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default App;
