
const express = require('express');
const router = express.Router();
const Account = require('../models/account');


router.get('',(req,res)=>{

    const local = {
        title:"Carwash app",
        description:"carwash"
    }
    res.render('index',{local})
})


router.get ('/accounts',async(req,res)=>{

    const local = {
        title:"Carwash app",
        description:"carwash"
    }
    try{
        var accounts = await Account.find();
        res.render('accounts',{local,accounts})
    }catch(error){
        
    }

   
})
router.get ('/reports',async(req,res)=>{

    const local = {
        title:"Carwash app",
        description:"reports"
    }

    try{
        const pipeline = [
            { $match: { tag: "carwash" } },
            
            { $group: { 
                
                  totalAmount: { $sum: { $toInt: "$amount" } },
                  
             },
            
                $sort: { _id: 1 }
              }
        ];
        console.log("fetching")
    //    var accounts = await Account.aggregate().match({'tag':'carwash'}).group
    const accounts_carwash = await Account.aggregate([
          { $match: { tag: "carwash" } },
     {
        $group:{_id: { $dateToString: { format: "%Y-%m", date: "$date" }},  
        totalAmount: { $sum: { $toInt: "$amount" } },}
     }
      ]);
      const accounts_water = await Account.aggregate([
        { $match: { tag: "water" } },
   {
      $group:{_id: { $dateToString: { format: "%Y-%m", date: "$date" }},  
      totalAmount: { $sum: { $toInt: "$amount" } },}
   }
    ]);
    const accounts_ginger = await Account.aggregate([
        { $match: { tag: "ginger" } },
   {
      $group:{_id: { $dateToString: { format: "%Y-%m", date: "$date" }},  
      totalAmount: { $sum: { $toInt: "$amount" } },}
   }
    ]);
    const accounts_income = await Account.aggregate([
        { $match: { type: "1" } },
   {
      $group:{ 
      _id: { $sum: { $toInt: "$amount" } },}
   }
    ]);
    const accounts_expense = await Account.aggregate([
        { $match: { type: "2" } },
   {
      $group:{ 
      _id: { $sum: { $toInt: "$amount" } },}
   }
    ]);
    const accounts_expense_2 = await Account.aggregate([
        { $match: { type: "2" } },
   {
      $group:{ 
      _id:  "$tag",
      amount:{ $sum: { $toInt: "$amount" } }
    }
   }
    ]);
    
    
    
    //    console.log(accounts_carwash)
    //    console.log(accounts_water)
    //    console.log(accounts_ginger)
    console.log(accounts_expense_2)
   
       const result_income = accounts_income.reduce((total, singleValue) => {
        return total + singleValue._id;
     }, 0);
     const result_expense = accounts_expense.reduce((total, singleValue) => {
        return total + singleValue._id;
     }, 0);
     console.log(result_expense);
     console.log(result_income);
 
        res.render('reports',{local,accounts_carwash,result_expense,result_income, accounts_expense_2 })
    }catch(error){
        console.log(error)
    }

   
})
router.post('/accounts',(req,res)=>{

  let amount = req.body.amount;
  let date = req.body.date;
  let type = req.body.type;
  let tag = req.body.tag;
   var account = {
    tag:tag,
    date:date,
    type:type,
    amount:amount
   }
   try{
    const post = new Account(account)
    post.save();
    return res.redirect('/accounts');
   }
   catch(error){
    console.log(error)
    
   }
})

router.get('/orders',(req,res)=>{

    const local = {
        title:"Carwash app",
        description:"carwash"
    }
    res.render('orders',{local})
})

router.post('/orders',(req,res)=>{

    const local = {
        title:"Carwash app",
        description:"carwash"
    }
    res.render('orders',{local})
})

module.exports = router;