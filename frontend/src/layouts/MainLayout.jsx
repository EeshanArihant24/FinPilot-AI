import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function MainLayout({children}){

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 ml-60">

<Navbar/>

<div className="p-8">

{children}

</div>

</div>

</div>

)

}