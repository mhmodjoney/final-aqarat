const authModel =require('../models/authModel');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt');
const {sendOtpEmail}=require('../utils/mailer');

exports.create = async(req,res )=>{
    console.log(req.body);
    console.log('create');
    try{
        const {fullName,userName,password,phoneNum,whatsappNum,email,type,otp_code}=req.body;
        // console.log({fullName,userName,password,phoneNum,whatsappNum,email,type});
        const hashed =await bcrypt.hash(password,10);
        let user=await authModel.create({email:email,password:hashed,user_name:userName,full_name:fullName,phone_number:phoneNum,whatsapp_number:whatsappNum,type:type,created_by:userName,otp_code:otp_code});
        // console.log(user.resault);
        if(user.resault=='email'){
            return res.status(400).json({message:"البريد الإلكتروني مستخدم بالفعل، حاول تسجيل الدخول"});
        }else if(user.resault=='user_name'){
            return res.status(400).json({message:"اسم المستخدم مستخدم بالفعل"});
        }else if(user.resault=='phone_number'){
            return res.status(400).json({message:"رقم الهاتف مستخدم بالفعل، حاول تسجيل الدخول"});
        }else if(Number.isInteger(user.user_id)){
            console.log(user);
            try{
                await sendOtpEmail({to:email,otpCode:otp_code});
            }catch(sendErr){
                console.log({message:'email send error',err:sendErr});
            };
            return res.status(201).json({message:'تم إنشاء المستخدم وتبقى تفعيله فقط',data:{user:user}})
        }else{
            return res.status(500).json({message:"خطأ في الخادم",data:{err:err}})    
        }
    }catch(err){
        return res.status(500).json({message:"خطأ في الخادم",data:{err:err}})
    };

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
        
        if(!user){
            // console.log("!user.resault")
            return res.status(401).json({message:"البيانات المدخلة غير صحيحة"});    
        }
        const isMach = await bcrypt.compare(password,user.password);
        if(!isMach){
            return res.status(401).json({message:"البيانات المدخلة غير صحيحة"});        
        }
        else if (user.state=="inactiv"){
            return res.status(401).json({message:"هذا الحساب محذوف تواصل مع الدعم لاسترجاعه"});
        }
        else if (user.state=="inactivated"){
            return res.status(401).json({message:"قم بتفعيل حسابك لتتمكن من تسجيل الدخول"});
        }
        else if(user.state=="deleted"){
            return res.status(401).json({message:"الحساب غير مفعل قم بتفعيله اولا ثم اعد المحاولة"});
        }
        else if(user.state=="banned"){
            return res.status(401).json({message:"الحساب محظور تواصل مع الدعم"});
        }
        else if(user.state=="activated"){
            delete user.password;
            const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
            console.log(user);
            return res.status(200).json({message:"تم تسجيل الدخول بنجاح",data:{token:token,user:user}});
        }
        else{
            return res.status(201).json({message:"خطأ في حسابك تواصل مع الدعم"});
        }
    } catch(err){
        res.status(500).json({err:"خطأ في الخادم",data:{errMessage:err}})
    };
};

exports.logout = async (req, res) => {
    console.log(req.body);
    console.log('logout');
    return res.status(200).json({ message: "تم تسجيل الخروج بنجاح. يرجى حذف الرمز المميز من جانب العميل." });
};
//dummy otpVerification for now 
exports.otpVerification = async(req,res)=>{
  try{
    const {email,otp_code}=req.body;
    let user=await authModel.verifyOtpByEmail({email:email,otp_code:otp_code});
    if(!user){
      return res.status(404).json({message:'المستخدم غير موجود'});
    }
    if(user.wrong){
      return res.status(401).json({message:'كود التفعيل المدخل خاطئ يرجى التأكد منه'});
    }
    if(user.expired){
      return res.status(400).json({message:'كود التفعيل منتهي الصلاحية قم بطلب كود اخر'});
    }
    else{
        delete user.password;
        const token =jwt.sign({userId:user.resault},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRESIN || '1d' });
        console.log(user);
        // REEEEED SECURETY ALLERT THIS IS WRONG ASK HOW TO SOLVE IT (THE API IS OPEN AND MAKE YOU LOGED IN EVEN IF YOU DONT KNOW THE PASSWORD OF THE ACCOUNT) 
        return res.status(201).json({message:'تم تفعيل الحساب وتسجيل الدخول بنجاح',data:{token:token,user:user}});
    }
  }catch(err){
    return res.status(500).json({message:'خطأ في الخادم',data:{err:err}});
  }
};