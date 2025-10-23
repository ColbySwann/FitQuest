import {Outlet} from "react-router-dom";
import {LoginButton} from "./components/LoginRegisterButtons.tsx";


function App() {


  return (
      <>
        <LoginButton />

          <div>
              <Outlet />
          </div>
      </>



  )
}

export default App
