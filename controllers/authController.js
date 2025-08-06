const authModel =require('../models/authModel');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt');

exports.create = async(req,res )=>{
    console.log(req.body);
    console.log('create');
    try{
        const {fullName,userName,password,phoneNum,whatsappNum,email,type}=req.body;
        // console.log({fullName,userName,password,phoneNum,whatsappNum,email,type});
        const hashed =await bcrypt.hash(password,10);
        let user=await authModel.create({email:email,password:hashed,user_name:userName,full_name:fullName,phone_number:phoneNum,whatsapp_number:whatsappNum,type:type,createdBy:userName});
        // console.log(user.resault);
        if(user.resault=='email'){
            return res.status(400).json({message:"البريد الإلكتروني مستخدم بالفعل، حاول تسجيل الدخول"});
        }else if(user.resault=='user_name'){
            return res.status(400).json({message:"اسم المستخدم مستخدم بالفعل"});
        }else if(user.resault=='phone_number'){
            return res.status(400).json({message:"رقم الهاتف مستخدم بالفعل، حاول تسجيل الدخول"});
        }else if(Number.isInteger(user.user_id)){
            // console.log(Number.isInteger(user.resault))
            delete user.password;
            const token =jwt.sign({userId:user.resault},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRESIN || '1d' });
            console.log(user);
            return res.status(201).json({message:'تم إنشاء المستخدم وتسجيل الدخول بنجاح',data:{token:token,user:user}})
        }else{
            return res.status(500).json({message:"خطأ في الخادم",data:{err:err}})    
        }
    }catch(err){
        return res.status(500).json({message:"خطأ في الخادم",data:{err:err}})
    }

};

exports.login = async (req,res)=>{
    console.log(req.body);
    console.log('login');
    try{
        const {email,password}=req.body;
        const hashed=await bcrypt.hash(password,10);
        // console.log(email);
        // console.log(hashed);
        let user= await authModel.login({email:email})
        // console.log(user);
        
        if(!user)
        {
            // console.log("!user.resault")
            return res.status(401).json({message:"البيانات المدخلة غير صحيحة"});    
        }
        const isMach = await bcrypt.compare(password,user.password);
        if(!isMach)
        {
            // console.log("!isMach")
            return res.status(401).json({message:"البيانات المدخلة غير صحيحة"});        
        }
        
        delete user.password;
        const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
        console.log(user);
        return res.status(200).json({message:"تم تسجيل الدخول بنجاح",data:{token:token,user:user}});
    
    } catch(err){
        res.status(500).json({err:"خطأ في الخادم",data:{errMessage:err}})
    };
};

exports.logout = async (req, res) => {
    console.log(req.body);
    console.log('logout');
    return res.status(200).json({ message: "تم تسجيل الخروج بنجاح. يرجى حذف الرمز المميز من جانب العميل." });
};