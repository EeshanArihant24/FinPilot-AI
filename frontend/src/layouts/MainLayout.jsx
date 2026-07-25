import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function MainLayout({children}){

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 bg-slate-100 min-h-screen">

<Navbar/>

<div className="p-6">

{children}

</div>

</div>

</div>

)

}