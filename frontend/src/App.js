import './App.css';
import Routers from './components/Routers';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routers/>
        
      </div>
    </QueryClientProvider>
  );
}


export default App;

