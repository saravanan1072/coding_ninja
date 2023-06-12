const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const signUpStructure=require('../model/signup')
 const signin=require('../model/signin')

var login;
const jwt_secreat="saravanan"
const signUpController=async(req,res)=>{
   const data=req.body;
   console.log(data);
 await bcrypt.hash(data.password,10,async (err,hash)=>{
    if(err){
        console.log(err);
    }else {
        
        const signDocument= new signUpStructure({
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            password:hash,
            mobile:data.mobile
           })
           const result= await signDocument.save()
           console.log(result);
           res.send(result)
          
    } 
   })
}





const signinController=async(req,res)=>{
    var fetchpassword;
    var fetchuser;
    var fetchfirstName;
    const data=req.body;
    console.log(data);
   const querey={email:data.email}

   const fetchData=await signUpStructure.find(querey)
      fetchData.map((item)=>{
       fetchpassword=item.password;
       fetchuser=item.email;
       fetchfirstName=item.firstName;
    })
console.log(fetchuser,fetchfirstName);
    if(data.email === fetchuser ){

if( await bcrypt.compare(data.password,fetchpassword))
{
   const token= await jwt.sign({email:data.email},jwt_secreat,{expiresIn:"15m"})
fetchfirstName=true;
    res.send({fetchfirstName,token})

}
        // await bcrypt.compare(data.password,fetchpassword,(err,valid)=>{
            // if(err){
            //     console.log("error");
            //     res.send("err")
            // }
            // else{
            //     console.log(valid);
            //     login=fetchfirstName;
            //     res.send(fetchfirstName)
            // }
       // })

    }
    else{
        login=false;
    }
  
}


const loginController=(req,res)=>{
    res.send(login)
    

}










module.exports={signUpController,signinController,loginController}