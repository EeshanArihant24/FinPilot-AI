import { useState } from "react";

export default function FraudDetection() {

    const [result,setResult]=useState(null);

    const predict=()=>{

        setResult({
            prediction:"SAFE",
            confidence:"96.8%"
        });

    }

    return(

<div className="min-h-screen bg-slate-100 flex justify-center items-center">

<div className="bg-white w-[500px] p-8 rounded-xl shadow-xl">

<h1 className="text-3xl font-bold mb-6">

AI Fraud Detection

</h1>

<input
placeholder="Amount"
className="w-full border rounded-lg p-3 mb-4"
/>

<select
className="w-full border rounded-lg p-3 mb-4"
>

<option>Shopping</option>
<option>Transfer</option>
<option>Food</option>

</select>

<input
placeholder="Location"
className="w-full border rounded-lg p-3 mb-4"
/>

<button

onClick={predict}

className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3"

>

Predict

</button>

{

result && (

<div className="mt-6">

<h2 className="text-xl font-bold">

Prediction

</h2>

<p className="text-green-600 text-2xl">

{result.prediction}

</p>

<p>

Confidence :

{result.confidence}

</p>

</div>

)

}

</div>

</div>

    );

}