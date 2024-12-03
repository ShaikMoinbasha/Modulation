import { decode } from "node:querystring";

 
//getting userToken
export  function getUserToken(req:Request) {
 
    const header = req.headers.get('Authorization');
    if(header&&header.startsWith("Bearer")){
       return header.slice(7);
    }
    return null;
   
}
 
export function getUserRole(userToken: string) {
    try {
      const decodedToken = decode(userToken);
      const payload=decodedToken[1];
 
      //returning role
      return (payload as any).role;
    } catch {
      return null;
    }
  }