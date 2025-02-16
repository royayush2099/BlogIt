import conf from "../conf/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service {
   client = new Client();
   databases;
   bucket;

   constructor(){
    this.client 
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket=new Storage(this.client);
   }

   async createPost (title,slug,content,featuredImage,status,userId){
   try{
  return await this.databases.createDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
    {
        title,
        slug,
        content,
        featuredImage,
        status,
        userId
    }
  )
   }catch(err){
    console.log("appwrite error:: createpost ::error",err)
   }
   }
   async updatePost(slug,{title,content,featuredImage,status}){
 try{
    return await this.databases.updateDocument(conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            status,
            featuredImage,
        }
    )
 }
 catch(err){
    console.log("appwrite error:: updatepost ::error",err)
 }
   }


   async deletePost(slug){
    try{
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
    }
    catch(err){
        console.log("appwrite error:: deletepost ::error",err)
    }
    return false
   }
   
   async getPost(slug){
    try{
 return this.databases.getDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug
 )
    }
    catch(err){
        console.log("appwrite error:: getepost ::error",err)
        return false
    }
   }

   async getPosts(queries = [Query.equal("status","active")]){
    try{
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
            100,

        )
    }
    catch(err){
        console.log("Appwrite error :: getposts :: error ",err)
        return false
    }
   }

   //file upload
   async uploadFile(file){
    try{
return await this,this.bucket.createFile(
    conf.appwriteBucketId,
    ID.unique(),
    file
)
    }
    catch(err){
        console.log("Appwrite error :: getposts :: error ",err);
        return false
        
    }
   }

   //delete file

   async deleteFile(fileID){
    try{
    await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileID
    )
    return true
    }
    catch(err){
        console.log("Appwrite error :: getposts :: error ",err);
        
    }
   }
    
   getFilePreview(fileID){
  return this.bucket.getFilePreview(
    conf.appwriteBucketId,
    fileID
  )
   }
}
const service = new Service();;
export default service