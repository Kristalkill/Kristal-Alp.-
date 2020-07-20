module.exports = {
  name: 'toEmoji',
  description: 'toEmoji',
  aliases: ["toEmoji"],
  public: true,
  async execute(Main, message, args) {
function transfer(symbol){
    if(symbol == "a" || symbol == "A") return ":regional_indicator_a:​";
    if(symbol == "b" || symbol == "B") return ":regional_indicator_b:​";
    if(symbol == "c" || symbol == "C") return ":regional_indicator_c:​";
    if(symbol == "d" || symbol == "D") return ":regional_indicator_d:​";
    if(symbol == "e" || symbol == "E") return ":regional_indicator_e:​";
    if(symbol == "f" || symbol == "F") return ":regional_indicator_f:​";
    if(symbol == "g" || symbol == "G") return ":regional_indicator_g:​";
    if(symbol == "h" || symbol == "H") return ":regional_indicator_h:​";
    if(symbol == "i" || symbol == "I") return ":regional_indicator_i:​";
    if(symbol == "j" || symbol == "J") return ":regional_indicator_j:​";
    if(symbol == "k" || symbol == "K") return ":regional_indicator_k:​";
    if(symbol == "l" || symbol == "L") return ":regional_indicator_l:​";
    if(symbol == "m" || symbol == "M") return ":regional_indicator_m:​";
    if(symbol == "n" || symbol == "N") return ":regional_indicator_n:​";
    if(symbol == "o" || symbol == "O") return ":regional_indicator_o:​";
    if(symbol == "p" || symbol == "P") return ":regional_indicator_p:​";
    if(symbol == "q" || symbol == "Q") return ":regional_indicator_q:​";
    if(symbol == "r" || symbol == "R") return ":regional_indicator_r:​";
    if(symbol == "s" || symbol == "S") return ":regional_indicator_s:​";
    if(symbol == "t" || symbol == "T") return ":regional_indicator_t:​";
    if(symbol == "u" || symbol == "U") return ":regional_indicator_u:​";
    if(symbol == "v" || symbol == "V") return ":regional_indicator_v:​";
    if(symbol == "w" || symbol == "W") return ":regional_indicator_w:​";
    if(symbol == "x" || symbol == "X") return ":regional_indicator_x:​";
    if(symbol == "y" || symbol == "Y") return ":regional_indicator_y:​";
    if(symbol == "z" || symbol == "Z") return ":regional_indicator_z:​";
    if(symbol == " ") return "    ";
    if(symbol == "?") return ":grey_question:";
    if(symbol == "!") return ":grey_exclamation:";
    if(symbol == "1") return ":one:";
    if(symbol == "2") return ":two:";
    if(symbol == "3") return ":three:";
    if(symbol == "4") return ":four:";
    if(symbol == "5") return ":five:";
    if(symbol == "6") return ":six:";
    if(symbol == "7") return ":seven:";
    if(symbol == "8") return ":eight:";
    if(symbol == "9") return ":nine:";
    if(symbol == "0") return ":zero:";
    if(symbol == "а" || symbol == "А") return ":regional_indicator_a:​";
    if(symbol == "б" || symbol == "Б") return ":regional_indicator_b:​";
    if(symbol == "ц" || symbol == "Ц") return ":regional_indicator_c:​";
    if(symbol == "д" || symbol == "Д") return ":regional_indicator_d:​";
    if(symbol == "е" || symbol == "Е") return ":regional_indicator_e:​";
    if(symbol == "ф" || symbol == "Ф") return ":regional_indicator_f:​";
    if(symbol == "г" || symbol == "Г") return ":regional_indicator_g:​";
    if(symbol == "х" || symbol == "Х") return ":regional_indicator_h:​";
    if(symbol == "и" || symbol == "И") return ":regional_indicator_i:​";
    if(symbol == "ж" || symbol == "Ж") return ":regional_indicator_z::regional_indicator_h:​​";
    if(symbol == "к" || symbol == "К") return ":regional_indicator_k:​";
    if(symbol == "л" || symbol == "Л") return ":regional_indicator_l:​";
    if(symbol == "м" || symbol == "М") return ":regional_indicator_m:​";
    if(symbol == "н" || symbol == "Н") return ":regional_indicator_n:​";
    if(symbol == "о" || symbol == "О") return ":regional_indicator_o:​";
    if(symbol == "п" || symbol == "П") return ":regional_indicator_p:​";
    if(symbol == "р" || symbol == "Р") return ":regional_indicator_r:​";
    if(symbol == "с" || symbol == "С") return ":regional_indicator_s:​";
    if(symbol == "т" || symbol == "Т") return ":regional_indicator_t:​";
    if(symbol == "у" || symbol == "У") return ":regional_indicator_u:​";
    if(symbol == "в" || symbol == "В") return ":regional_indicator_v:​";
    if(symbol == "x" || symbol == "X") return ":regional_indicator_x:​";
    if(symbol == "й" || symbol == "Й") return ":regional_indicator_y:​";
    if(symbol == "з" || symbol == "З") return ":regional_indicator_z:​";
    if(symbol == "ш" || symbol == "Ш") return ":regional_indicator_s:​:regional_indicator_h:​";
    if(symbol == "ю" || symbol == "Ю") return ":regional_indicator_y:​:regional_indicator_u:​";
    if(symbol == "я" || symbol == "Я") return ":regional_indicator_y:​:regional_indicator_a:​";
    if(symbol == "ч" || symbol == "Ч") return ":regional_indicator_c:​:regional_indicator_h:​";
    if(symbol == "щ" || symbol == "Щ") return ":regional_indicator_c:​:regional_indicator_s::regional_indicator_h:​​";
    if(symbol == "ь" || symbol == "Ь") return "​";
    if(symbol == "ё" || symbol == "Ё") return "​:regional_indicator_e:";
    if(symbol == "ы" || symbol == "Ы") return "​:regional_indicator_u:";
    if(symbol == "э" || symbol == "Э") return "​:regional_indicator_e:";
}
message.channel.send(`123 ${transfer(args)}`)
}
}