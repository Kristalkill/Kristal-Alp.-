const Main = new(require('./Structures/Main'))
const dotenv = require("dotenv").config();
try {
String.prototype.translate = function(vars){
    var str = this;
    for (const [KEY, value] of Object.entries(vars)) {
      str = str.replace(new RegExp(`%${KEY}%`, 'g'), value);
    }
    return str;
  }
  String.prototype.chunk = function(len){ 
     let arr = this.match(new RegExp("(?: *[^\\n]){0," + (len-1) + "}\\n|(?: *.){1," + len + "}", "g")).map(c=>c.replace(/^ +| +$/g, ''))
     let result = []
     for (let line of arr)
      result.length == 0
      ? result.push(line)
      : (result[result.length -1].length + line.length <  len
      ? result[result.length-1] += line
      : result.push(line)
      )
      return result;
}
  const clear = [
  {base:"A",chars:"ÁÀÂǍĂÃẢẠÄÅĀĄẤẦẪẨẬẮẰẴẲẶǺ"},
  {base:"C",chars:"ĆĈČĊÇ"},
  {base:"D",chars:"ĎĐÐ"},
  {base:"E",chars:"ÉÈÊĚĔẼẺĖËĒĘẾỀỄỂẸỆ"},
  {base:"G",chars:"ĞĜĠĢ"},
  {base:"H",chars:"ĤĦ"},
  {base:"I",chars:"ÍÌĬÎǏÏĨĮĪỈỊ"},
  {base:"J",chars:"Ĵ"},
  {base:"K",chars:"Ķ"},
  {base:"L",chars:"ĹĽĻŁĿ"},
  {base:"N",chars:"ŃŇÑŅ"},
  {base:"O",chars:"ÓÒŎÔỐỒỖỔǑÖŐÕØǾŌỎƠỚỜỠỞỢỌỘ"},
  {base:"P",chars:"ṔṖ"},
  {base:"R",chars:"ŔŘŖ"},
  {base:"S",chars:"ŚŜŠŞ"},
  {base:"T",chars:"ŤŢŦ"},
  {base:"U",chars:"ÚÙŬÛǓŮÜǗǛǙǕŰŨŲŪỦƯỨỪỮỬỰỤ"},
  {base:"W",chars:"ẂẀŴẄ"},
  {base:"Y",chars:"ÝỲŶŸỸỶỴ"},
  {base:"Z",chars:"ŹŽŻ"},
  {base:"a",chars:"áàâǎăãảạäåāąấầẫẩậắằẵẳặǻ"},
  {base:"C",chars:"ćĉčċç"},
  {base:"d",chars:"ďđ"},
  {base:"e",chars:"éèêěĕẽẻėëēęếềễểẹệ"},
  {base:"g",chars:"ğĝġģ"},
  {base:"h",chars:"ĥħ"},
  {base:"i",chars:"íìĭîǐïĩįīỉị"},
  {base:"j",chars:"ĵ"},
  {base:"k",chars:"ķ"},
  {base:"l",chars:"ĺľļłŀ"},
  {base:"n",chars:"ńňñņ"},
  {base:"o",chars:"óòŏôốồỗổǒöőõøǿōỏơớờỡởợọộ"},
  {base:"p",chars:"ṕṗ"},
  {base:"r",chars:"ŕřŗ"},
  {base:"s",chars:"śŝšş"},
  {base:"t",chars:"ťţŧ"},
  {base:"u",chars:"úùŭûǔůüǘǜǚǖűũųūủưứừữửựụ"},
  {base:"w",chars:"ẃẁŵẅ"},
  {base:"y",chars:"ýỳŷÿỹỷỵ"},
  {base:"z",chars:"źžż"}
]
  String.prototype.capitalize = function () {
    return this.replace(/^./, function (match) {
      return match.toUpperCase();
    });
  };
  Array.prototype.shuffle = function () {
    return this.sort(() => Math.random() - 0.5);
  }
  String.prototype.clear = function() { 
    return this.normalize("NFD").replace(/\P{Letter}/gu, '').capitalize();
  }
}catch(err){
    console.log(err)
}
Main.start()