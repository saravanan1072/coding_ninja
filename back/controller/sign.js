const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const signUpStructure=require('../model/signup')
 const courseStructure=require('../model/course')
 const tryStructure=require('../model/multiple')

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
            mobile:data.mobile,
            data:new Date().toLocaleString()
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
    var name;
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
   name=fetchuser
fetchfirstName=true;
console.log(fetchfirstName,token,name);
    res.send({fetchfirstName,token,name})

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


const updateController=async(req,res)=>{
            const data=req.body.data;
        console.log(req.body.data);
    const querey={email:req.body.names}
        console.log(querey);
    const fetchData=await courseStructure.find(querey)
   if(fetchData){
    const courseDocument= new courseStructure({
      
        id:Date(),
        email:req.body.names,
        course: data.course,
        title:  data.title,
        title2:  data.title2,
        img: data.img,
        time: data.time,
        problem: data.problem,
        ratings:  data.ratings,
        count:  data.count,
        price:  data.price,
        detailhead:  data.detailhead, 
        detailcontent:  data.detailcontent,
        detailurl: data.detailurl,
    
       })
       const result= await courseDocument.save()
       console.log(result);
       res.status(200).send({message:"course enrollement sucessfull",result})
   }else{    
   res.send({message:"complete a course duration to take another course"})
   }
}
const courseDetail=async(req,res)=>{

    const user=req.body
    console.log(user);
    const querey={email:user.names}
    const fetchData=await courseStructure.find(querey)
    console.log(fetchData);
    res.send({message:"sucess",fetchData})


}


const tryController=async(req,res)=>{
    const data=req.body.formData;
    console.log(req.body);
const querey={email:req.body.names}
    console.log(querey);
    console.log(data);
 const fetchData=await tryStructure.find(querey)
if(fetchData){
const courseDocument= new tryStructure({
  
   
    name:data.name,
    email:req.body.names,
        mobile:data.mobile,
        address1:data.address1,
        address2:data.address2,
        pincode:data.pincode,
        state:data.pincode,
        country:data.country,
        year:data.year,
        degree:data.degree,
        college:data.college,
        company:data.company,
        goal:data.goal,
        kind:data.kind

   })
   const result= await courseDocument.save()
   console.log(result);
   res.status(200).send({message:"free trial course sucessfull",result})
}else{    
res.send({message:"only one course to take free"})
}

}







module.exports={signUpController,signinController,updateController,courseDetail,tryController}