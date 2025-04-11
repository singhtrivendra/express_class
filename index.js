const express = require("express")

const app = express();
var users = [
    {
        name: 'John',
        kidneys: [{
            healthy: false
        }, {
            healthy: true
        }]
    }]

    app.use(express.json());

    app.get("/",function(req,res){
        const johnKidneys = users[0].kidneys;
        console.log(johnKidneys);
        const numberOfKidneys = johnKidneys.length;
        // filter
        let numberOfHealthyKidneys = 0;
        for (let i = 0; i < johnKidneys.length; i++) {
            if (johnKidneys[i].healthy) {
                numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
            }
        }
        const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
        res.json({
            numberOfKidneys,
            numberOfHealthyKidneys,
            numberOfUnhealthyKidneys
        })
    })

app.post("/", function(req, res) {
    const n = req.query.n
    console.log(req.body); //
        const isHealthy = req.body.isHealthy;
        users[0].kidneys.push({
            healthy: isHealthy
        })
        res.json({
            msg: "Done!"
        })
})

app.put("/",function(req,res){
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({})
})
app.delete("/",function(req,res){
    if(isThereAtLeastOneHealthyKidney(users[0].kidneys)){
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
            })
          }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "Done!"})
    } else{
        res.sendStatus(411).json({
            msg: "you have no bad kidneys"
        });
    }
})

function isThereAtLeastOneHealthyKidney(kidneys){
    let isThereAtLeastOneHealthyKidney = false;
    for (let i = 0; i < kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            isThereAtLeastOneHealthyKidney = true;
        }
    }
}
app.listen(3010,'0.0.0.0' ,()=>{
    console.log("Server is running on http://0.0.0.0:3010")
});