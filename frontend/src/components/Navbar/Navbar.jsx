import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar(){

return(

<div className="bg-white shadow flex justify-between items-center px-8 py-4">

<h1 className="text-2xl font-bold text-blue-600">

FinPilot AI

</h1>

<div className="flex items-center gap-6">

<FaBell size={22}/>

<FaUserCircle size={30}/>

</div>

</div>

)

}

