/**
 * @param {ObjectArray} accountBalanceHistory
 */
const accountTypeChecker = (accountBalanceHistory) => {

   //only a valid array of objects is expected
   let isArrayObject = !!(Array.isArray(accountBalanceHistory) && accountBalanceHistory.every(info=>typeof info === "object"))

   if(!accountBalanceHistory || !isArrayObject)
      throw new Error("A balance account history is expected")

   //sort account history to start from older months to recent months
   //sort in descending order of months
   accountBalanceHistory.sort((a,b) => b.monthNumber - a.monthNumber)

   let previousBalance = null;
   let previousBalanceDifference = null;
   let isFixedBalance = true;

   for(let i=0; i<accountBalanceHistory.length; i++){
      let account = accountBalanceHistory[i].account ? accountBalanceHistory[i].account : {}

      let currentBalance = (account && account.balance && account.balance.amount) ? account.balance.amount:0 

      if(previousBalance !== null){
         let difference = previousBalance - currentBalance

         if(previousBalanceDifference !== null && previousBalanceDifference !== difference){
            isFixedBalance = false
            break
         }

         previousBalanceDifference = difference
      }

      previousBalance = currentBalance
   }

   return isFixedBalance ? "B" : "A";
};

module.exports = accountTypeChecker