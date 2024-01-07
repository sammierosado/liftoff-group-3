import React from "react";

function StamplistPage(){

    // const allStamps = //Some function that fetches the data and returns all the stamps

    const allStamps = [
        {
            id : 1,
            action: 'Save 1'
        },
        {
            id : 2,
            action: 'Save 1'
        },
        {
            id : 3,
            action: 'Save 1'
        }
    ]


    return(
<section>
<h1>All Timestamps</h1>

{/* look up react syntax to replace thymleaf code */}
<form action="/stamps/save" method="post">
    <button type="submit">Save Timestamps</button>
</form>
<table>
    <thead>
    <tr>
        <th>Timestamp</th>
        <th>Action (optional)</th>
    </tr>
    </thead>
    <tbody>
        {allStamps.map((stamp)=>(
            <>
           <tr key={stamp.id}/>
           {/* <td><span>{stamp.getStampTime()}</span></td> */}
           {stamp.action !== null && stamp.action ? (
           <tr>{stamp.action}</tr>) : (null)} 
           </>
        ))}
    </tbody>
</table>
</section>
    )
}

export default StamplistPage;