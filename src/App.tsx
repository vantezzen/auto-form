import Api from "./examples/Api";
import Basics from "./examples/Basics";
import ConfirmPassword from "./examples/ConfirmPassword";
import Controlled from "./examples/Controlled";
import SubObject from "./examples/SubObject";

function App() {
  return (
    <>
      <div className="max-w-lg mx-auto my-6 space-y-8">
        <Basics />
        <SubObject />
        <Controlled />
        <ConfirmPassword />
        <Api />
      </div>
    </>
  );
}

export default App;
