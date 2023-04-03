const checkExpiry = (expiry) => {
    const today = new Date();
    const isoToday = today.toISOString()

    let expYear = expiry?.split('-')[0]
    let expMonth = expiry?.split('-')[1]

    let currYear = isoToday?.split('-')[0]
    let currMonth = isoToday?.split('-')[1]

    if (expYear < currYear) {
      return true
    }

    if (expYear > currYear) {
      return false
    }

    if (expYear === currYear) {
      if (expMonth === currMonth || (expMonth-1) === currMonth || expMonth < currMonth) {
        return true
      } else {
        return false;
      }
    }
  }

  export default checkExpiry;