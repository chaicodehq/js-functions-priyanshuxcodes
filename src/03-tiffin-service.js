/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  const avlMealType = ["veg", "nonveg", "jain"]
  if(!avlMealType.includes(mealType) || !name || name == "") return null
  let dailyRate = 0
  if(mealType === "veg") dailyRate = 80 
  if(mealType === "nonveg") dailyRate = 120 
  if(mealType === "jain") dailyRate = 90 
  const totalCost = days * dailyRate
  return { name, mealType, days, dailyRate, totalCost }
}

export function combinePlans(...plans) {
  // Your code here
  if(plans.length == 0) return null
  let totalCustomers = 0, totalRevenue = 0
  let mealBreakdown = {"veg": 0, "nonveg": 0, "jain": 0}
  for(const plan of plans) {
    totalCustomers++
    totalRevenue += plan.totalCost
    if(plan.mealType == "veg") mealBreakdown["veg"] ++
    if(plan.mealType == "nonveg") mealBreakdown["nonveg"] ++
    if(plan.mealType == "jain") mealBreakdown["jain"] ++
  }
  return {totalCustomers, totalRevenue, mealBreakdown}
}

export function applyAddons(plan, ...addons) {
  // Your code here
    if (!plan) return null;
  let addonNames = []
  let newDailyRate = plan.dailyRate
  // let newPlan = {name: plan.name, mealType: plan.mealType, days: plan.days, newDailyRate, newTotalCost, addonNames}
  for(const addOn of addons) {
    addonNames.push(addOn.name)
    newDailyRate += addOn.price
  }
  const newTotalCost = newDailyRate * plan.days
  return {plan, dailyRate: newDailyRate, totalCost: newTotalCost, addonNames}
}
