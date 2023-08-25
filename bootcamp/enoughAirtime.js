export default function enoughAirtime(usageString,p) {
    let listNew = usageString.split(',')
    let totalCost = 0;
    for (let item of listNew)  {
      if (item.trim() == "sms"){
        totalCost += 0.75;
      } else if (item.trim() == "call"){
        totalCost += 1.88;
      } else if (item.trim() == "data"){
        totalCost += 12;
      }
    }  
      if(p-totalCost>0){
        return "R" + (p-totalCost).toFixed(2);
      } else {
  totalCost = 0;
            return "R" + totalCost.toFixed(2);
      }
    }