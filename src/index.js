const express=require('express');
const mongoose=require('mongoose');
//const hbs=require('hbs');
const app=express();

//stabling connection to the mongo db 

mongoose.connect('mongodb://localhost:27017/medicalWeb',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conection susesful to mongo db")
}).catch((e)=>{
    console.log(e);
})
//set users requst data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//defineing schimas 

const userContact= new mongoose.Schema(
    {
        CName:{
         type:String,
         
     },
     CMobile:{
         type:Number,
        
     },
     Cemail:{
         type:String,
     
     },
     //medicine one detail
     m1:{
         type:String,
     },
     Q1:{
         type:Number
     },
     R1:{
        type:Number
     },
     //medicine two detail
     m2:{
         type:String
     },
     Q2:{
         type:Number
     },
     R2:{
         type:Number
     },
     m3:{
        type:String
    },
    Q3:{
        type:Number
    },
    R3:{
        type:Number
    },
    mt1:{
        type:Number
    },
    mt2:{
        type:Number
    },
    mt3:{
        type:Number
    },
    total:{
        type:Number
    }
    }
);

//define models , or create collection
const userbills=mongoose.model("bil",userContact)

//set directoctorys
var public="C:/Users/mahen/Desktop/Node-js Study/projects/Bill Generator/public";
app.use("/",express.static(public));
//app.use("views")
app.set('view engine', 'hbs');
const viewsPath="C:/Users/mahen/Desktop/Node-js Study/projects/Bill Generator/views";
app.set("views",viewsPath)
//routings
app.get("/",(req,res)=>{
    res.render("bill");
})


app.post("/login",async(req,res)=>{
    try{

        var reqbody=req.body;
        console.log(reqbody);
        const CName=req.body.CName;
        const  CMobile=req.body. CMobile;
        const   Cemail=req.body.  Cemail;


        const m1=req.body.m1;
        const m2=req.body.m2;
        const m3=req.body.m3;

        const Q1=req.body.Q1;
        const Q2=req.body.Q2;
        const Q3=req.body.Q3;

        const R1=req.body.R1;
        const R2=req.body.R2;
        const R3=req.body.R3;

        const mt1=req.body.mt1;
        const mt2=req.body.mt2;
        const mt3=req.body.mt3;

        const total=req.body.total;
        const billData=new  userbills({
            CName:CName,
            CMobile:CMobile,
            Cemail:Cemail,
            m1:m1,m2:m2,m3:m3,
            Q1:Q1,Q2:Q2,Q3:Q3,
            R1:R1,R2:R2,R3:R3,
            mt1:mt1,mt2:mt2,mt3:mt3,
            total:total
        })
        const result=billData.save()
        console.log(`data save ${billData}`);
        res.render("billForm" ,billData);
    }catch(e){
        res.send(e);
    }
})

app.get("/bill",(req,res)=>{
    res.render("billForm");
})
app.get("/form",(req,res)=>{
    res.render("billForm");
})

app.get("/search" ,(req,res)=>{
    res.render("find");
})

app.post("/find" , async(req ,res)=>{
      try{
        var Cemail=req.body.Cemail;
        console.log(Cemail);
        var result =await userbills.find({Cemail:Cemail});
       if (result[0]==undefined) {
              res.render("404");
       } else {res.render("billForm" ,result[0]);}
    

      }catch(e){
          res.send(e);
      }

})

app.get("*" ,(req,res)=>{
    res.render("404");
})

//lisning server
var port=80;
app.listen(port,()=>{

    console.log(`server start at ${port}`);
})

