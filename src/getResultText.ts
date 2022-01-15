export const getResultText = (count: number) => {
  let text = `餅を${count}回つきました`

  if (count < 10) {
    text = `餅を${count}回つきました。あなたは餅の雑魚です。`
  } else if (count < 20) {
    text = `餅を${count}回つきました。あなたは餅の素人です。`
  } else if (count < 30) {
    text = `餅を${count}回つきました。あなたは餅の一般人です。`
  } else if (count < 40) {
    text = `餅を${count}回つきました。あなたは餅の旦那です。`
  } else if (count < 50) {
    text = `餅を${count}回つきました。あなたは餅の達人です。`
  } else if (count < 60) {
    text = `餅を${count}回つきました。あなたは餅の大王です。`
  } else if (count < 70) {
    text = `餅を${count}回つきました。あなたは餅の魔神です。`
  } else if (count < 80) {
    text = `餅を${count}回つきました。あなたは餅の廃人です。`
  } else if (count < 90) {
    text = `餅を${count}回つきました。あなたは餅の狂人です。`
  } else if (count < 100) {
    text = `餅を${count}回つきました。あなたは餅の神です。`
  } else {
    text = `餅を${count}回つきました。あなたは餅の帝王です。`
  }

  return text
}
