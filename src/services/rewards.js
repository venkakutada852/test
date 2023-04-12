
const CalculateRewards = (transactionAmount) => {
  if (transactionAmount > 100) {
    // if greater than 0, apply the required business logic and calculate the rewards
    const diffOver100 = transactionAmount - 100;
    const rewardsForAbove100 = 2 * diffOver100;
    const remainingAmount = transactionAmount - diffOver100;
    const diffOver50 = remainingAmount - 50;
    const rewardsForAbove50 = 1 * diffOver50;
    const totalRewards = rewardsForAbove100 + rewardsForAbove50
    return totalRewards
  } else {
    // if the transaction amount is less than 50, then 0 eward points
    if (transactionAmount < 50) return 0;
    const diffOver50 = transactionAmount - 50;
    const rewardsForAbove50 = 1 * diffOver50;
    return rewardsForAbove50
  }
}

export default CalculateRewards;
