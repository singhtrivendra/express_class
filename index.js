const express = require("express");

const app = express();

let users = [
    {
        name: 'John',
        kidneys: [
            { healthy: false },
            { healthy: true }
        ]
    }
];

app.use(express.json());

app.get("/", function (req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;

    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({ healthy: isHealthy });

    res.json({ msg: "Done!" });
});

app.put("/", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
});

app.delete("/", function (req, res) {
    if (isThereAtLeastOneUnhealthyKidney(users[0].kidneys)) {
        const newKidneys = users[0].kidneys.filter(k => k.healthy);
        users[0].kidneys = newKidneys;
        res.json({ msg: "Done!" });
    } else {
        res.status(411).json({ msg: "You have no bad kidneys" });
    }
});

function isThereAtLeastOneUnhealthyKidney(kidneys) {
    for (let i = 0; i < kidneys.length; i++) {
        if (!kidneys[i].healthy) {
            return true;
        }
    }
    return false;
}

app.listen(3010, '0.0.0.0', () => {
    console.log("Server is running on http://0.0.0.0:3010");
});
