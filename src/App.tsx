import Api from "./examples/Api";
import Array from "./examples/Array";
import Basics from "./examples/Basics";
import ConfirmPassword from "./examples/ConfirmPassword";
import Controlled from "./examples/Controlled";
import Dependencies from "./examples/Dependencies";
import InputWithoutLabel from "./examples/InputWithoutLabel";
import Order from "./examples/Order";
import SubObject from "./examples/SubObject";

function App() {
  return (
    <>
      <div className="mx-auto my-6 max-w-lg space-y-8">
        <Basics />
        <InputWithoutLabel />
        <SubObject />
        <Controlled />
        <ConfirmPassword />
        <Api />
        <Array />
        <Dependencies />
        <Order />
      </div>
    </>
  );
}

export default App;
