import { BrowserRouter,Routes,Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Wallet from "../pages/Banking/Wallet";
import Transfer from "../pages/Banking/Transfer";
import Transactions from "../pages/Banking/Transactions";
import FraudDetection from "../pages/AI/FraudDetection";
import PredictionHistory from "../pages/AI/PredictionHistory";

export default function AppRoutes(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Dashboard/>}/>

<Route path="/wallet" element={<Wallet/>}/>

<Route path="/transfer" element={<Transfer/>}/>

<Route path="/transactions" element={<Transactions/>}/>

<Route path="/fraud" element={<FraudDetection/>}/>

<Route path="/history" element={<PredictionHistory/>}/>

</Routes>

</BrowserRouter>

)

}