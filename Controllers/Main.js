const mainModel=require('../Models/mainModel');

exports.getAllExpense=async(req, res, next)=>{
    try{
        const data=await mainModel.findAll();
        res.status(201).json({expenseData:data});
    }
    catch(err){
        res.status(500).json({error:err});
    }   
};

exports.postAddExpense=async(req, res, next)=>{
    try{
        const amount=req.body.amount;
        const desc=req.body.description;
        const category=req.body.category;
        const data= await mainModel.create({amount:amount,description:desc,category:category});
        res.status(201).json({newExpenseData:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
    
}
 
exports.postDeleteExpense=async(req,res,next)=>{
    try{
        const uId=req.params.id;
        await mainModel.destroy({where:{id:uId}});
        res.sendStatus(200);    
    }
    catch(err){
        res.status(500).json({error:err});
    }
};
