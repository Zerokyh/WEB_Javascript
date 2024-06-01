import { data } from "./data.js";

// 1. timezone이 europe인 데이터 중에서 가져와서
// -> phone, fullName, ipAddress

const one = data
  .filter(({ timezone }) => timezone.includes("Europe"))
  .map(({ phone, fullName, ipAddress }) => ({
    phone,
    fullName,
    ipAddress,
  }));
// console.log(one);

// 2. id가 짝수인 데이터중에서
// timezone[대륙]이랑 phone[-빼고], money[$빼고]를 가져오기
const two = data
  .filter(({ id }) => !(id % 2))
  .map(({ timezone, phone, money }) => ({
    timezone: timezone.split("/")[0],
    phone: phone.replaceAll("-", ""),
    money: money.replace("$", ""),
  }));
// console.log(two);

// 3. America or Asia 데이터 중에서
// ipAddress[.을 지우고] fullName 앞이름[First name] creditcard로 변경 후 가져오기
const three = data
  .filter(
    ({ timezone }) =>
      timezone.split("/")[0].includes("America") ||
      timezone.split("/")[0].includes("Asia")
  )
  .map(({ ipAddress, fullName, creditCardType: creditcard }) => {
    return {
      ipAddress: ipAddress.replaceAll(".", ""),
      fullName: fullName.split(" ")[0],
      creditcard,
    };
  });
// console.log(three);

// 4. 달러가 25000 ~ 50000 사이 데이터와 timezone이 africa인 데이터 중에서
// timezone[수도만 가져오기] fullName 뒷이름(Family name)가져오기
const four = data
  .filter(({ money, timezone }) => {
    const numberMoney = Number(money.replace("$", ""));
    const isValidMoney = 25000 <= numberMoney && numberMoney <= 50000;
    const isValidTimezone = timezone.includes("Africa");

    return isValidMoney && isValidTimezone;
  })
  .map(({ timezone, fullName }) => ({
    timezone: timezone.split("/")[1],
    fullName: fullName.split(" ")[1],
  }));
// console.log(four);

// 5. ipAddress [24.169.188.122] 뒷자리 세개의 수의 합이 15 이하인 애들 중에서
// timezone, fullname, money 가져오기
const five = data.filter(({ ipAddress }) => {
  const ipArr = [...ipAddress];
  const lastIndex = ipArr.findLastIndex((v) => v == ".");
  const sum = ipArr
    .slice(lastIndex + 1, ipArr.length)
    .map((v) => Number(v))
    .reduce((a, c) => a + c);

  return sum < 15;
});
console.log(five);
