import { Link } from "react-router-dom";

export default function Sidebar(){

return(

<div className="bg-slate-900 text-white w-60 h-screen p-6">

<h2 className="text-3xl font-bold mb-10">

FinPilot

</h2>

<div className="space-y-5">

<Link to="/">Dashboard</Link>

<Link to="/wallet">Wallet</Link>

<Link to="/transfer">Transfer</Link>

<Link to="/transactions">Transactions</Link>

<Link to="/fraud">AI Detection</Link>

<Link to="/history">History</Link>

</div>

</div>

)

}