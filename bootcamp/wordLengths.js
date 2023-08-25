export default function wordLengths(str) {
  const newArrayList = str.split(" ");
  let newStr = 0
  for (let i = 0; i < newArrayList.length; i++) {
    newStr += 1
  }
  console.log(newStr.length)
  return newArrayList.length;
}