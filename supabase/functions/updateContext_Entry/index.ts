import getDataByAction from "../Hander/updateHandler.ts";
import { getUserRole, getUserToken } from "../Hander/userHandler.ts";

Deno.serve(async (req)=>{
  try{
  if(req.method==="PATCH"){
    const getToken=getUserToken(req);
    if(!getToken){
      return new Response(
        JSON.stringify("Unauthorized user Token"),
        {status:500,headers:{"Content-Type":"Application/json"}}
        )
    }
    const role=getUserRole(getToken)
    console.log(role)
    if(role==="Admin"|| role==="anon")
      return await getDataByAction(req);
    
      return new Response(
        JSON.stringify("Only Admin should Access"),
        {status:500,headers:{"Content-Type":"Application/json"}}
        )
      }
  
  return new Response(
    JSON.stringify("using Wrong Method"),
    {status:500,headers:{"Content-Type":"Application/json"}}
    )
  }catch(error){
    return new Response(
      JSON.stringify("Internal Service error"),
      {status:500,headers:{"Content-Type":"Application/json"}}
      )
  }
  });