import conf from '../conf/config.js';
import {Client, Account ,ID} from 'appwrite';

 export class AuthService{
   client = new Client();
   account;
   constructor(){
    this.client 
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
   this.account = new Account(this.client)
  
    
   }
   async createAccount({email,password,name}){
    try{
 const userAccount = await this.account.create(ID.unique(),email,password,name);
 if(userAccount){
    //call another method
    return this.login({email,password})
   // return userAccount
 } else{
    return  userAccount
 }
    }
    catch(err){
        throw err;
    }
   }
  async login({email,password}){
    try{
   return    await this.account.createEmailPasswordSession(email,password);
    }catch(err){
        throw err;
    }
  }

  async getCurrentUser(){
    try{
         return await this.account.get()
    }catch(err){
        console.log("Appwrite service :: getCurrentUser :: error", err)
       
    }
    return null;
   
  }

  async logout(){
    try{
await this.account.deleteSessions()
    }catch(err){
        console.log("Appwrite error!!!",err)
    }
  }
 }

const authService = new AuthService()//here we debug it as it is missing paranthesis
 export default authService