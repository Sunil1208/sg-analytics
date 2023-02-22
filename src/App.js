import { useRecoilValue } from "recoil";

import Container from './components/Container.component';
import Loader from "./components/Loader.component";
import { loaderState } from "./services/atoms.services";

function App() {  
  const isLoading = useRecoilValue(loaderState);
  return (
    <div className="relative ">
      <Loader isLoading={isLoading}/>
      <Container />
    </div>
  );
}

export default App;
