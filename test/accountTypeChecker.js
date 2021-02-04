const assert = require('assert')
const accountTypeChecker = require("../accountTypeChecker");

describe("Account balance type checker test suite",function(){
   it("should reject when no account history is provided to function",function(){
      return assert.throws(()=>{
         accountTypeChecker()
      },{name:"Error",message:"A balance account history is expected"})
   })

   it("should reject when account history is not an array of objects",function(){
      let data = [1,2,3,5]
      return assert.throws(()=>{
         accountTypeChecker(data)
      },{name:"Error",message:"A balance account history is expected"})
   })

   it("should return correct account type with empty test data",function(){
      const accountBalanceHistory = []
      
      return assert.strictEqual(accountTypeChecker(accountBalanceHistory),"B")
   })

   it("should return correct account type with B test data",function(){
      const accountBalanceHistory = [
         {
            monthNumber: 0,
            account: {
               balance: { amount: 0 },
            },
         },
         {
            monthNumber: 1,
            account: {
               balance: { amount: 100 },
            },
         },
         {
            monthNumber: 2,
            account: {
               balance: { amount: 200 },
            },
         }
      ]

      return assert.strictEqual(accountTypeChecker(accountBalanceHistory),"B")
   })

   it("should return correct account type with A test data",function(){
      const accountBalanceHistory = [
         {
            monthNumber: 0,
            account: {
               balance: { amount: 70 },
            },
         },
         {
            monthNumber: 1,
            account: {
               balance: { amount: 150 },
            },
         },
         {
            monthNumber: 2,
            account: {
               balance: { amount: 200 },
            },
         }
      ]

      return assert.strictEqual(accountTypeChecker(accountBalanceHistory),"A")
   })   
})