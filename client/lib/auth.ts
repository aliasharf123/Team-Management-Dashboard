import {jwtVerify} from 'jose';

export const validateToken = async (token: string, secretKey: string): Promise <boolean> => {
  try {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secretKey));
    
    if (payload && payload.email) {
      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  } catch (error) {
    // Token validation failed
    

    return false;
  }
}