

import longestWord from './bootcamp/longestWord.js';
import shortestWord from './bootcamp/shortestWord.js'
import wordLengths from './bootcamp/wordLengths.js'
import totalPhoneBill from './bootcamp/phonebill.js';
import enoughAirtime from './bootcamp/enoughAirtime.js';

import express from 'express';
// const express=require('express');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api/word_game', function(req, res){
      const sentence = req.query.sentence;

    if (!sentence) {
        res.json({
            error : 'please send in a sentence to analyze'
        })
    }

    res.json({
        "longestWord" : longestWord(sentence),
        "shortestWord" : shortestWord(sentence),
        "sum" : wordLengths(sentence)
    });
   
});
let callPrice = 2.75
let smsPrice = 0.65

app.post("/api/phonebill/total", function (req, res) {
    try {
        const { bill } = req.body;
        console.log(req.body);

        if (!bill) {
            res.status(400).json({ error: "No bill specified" });
            return;
        }

        const total = totalPhoneBill(bill);
        res.json({ total });
    } catch (error) {
        console.error("Error processing phone bill:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/phonebill/total", function (req, res) {
    console.log(req.body, req.params, req.query);
    const bill = 'call'/// res.query.bill 

    res.json({
        bill: totalPhoneBill(bill)
    })
})

app.get("/api/phonebill/prices", function (req, res) {
    res.json({
        call: callPrice,
        sms: smsPrice,
    });
});

app.post("/api/phonebill/price", function (req, res) {
    const { type, price } = req.body;

    if (type === "call") {
        callPrice = price;
    } else if (type === "sms") {
        smsPrice = price;
    }

    res.json({
        status: "success",
        message: `The ${type} was set to ${price}`,
    });
});

app.post("/api/enough", function (req, res) {
    try {
        const { usage, available } = req.body;

        if (!usage || !available) {
            res.status(400).json({
                error: "Please provide usage and available airtime.",
            });
            return;
        }

        const result = enoughAirtime(usage, available);
        res.json({ result });
    } catch (error) {
        console.error("Error calculating enough airtime:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 6007;
app.listen(PORT, function(){
console.log('api started on port', PORT)
})

