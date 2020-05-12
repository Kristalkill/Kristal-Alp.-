module.exports=
 function abbreviateNumber(number,digits=2) {
  var expK = Math.floor(Math.log10(Math.abs(number)) / 3);
  var scaled = number / Math.pow(1000, expK);

  if(Math.abs(scaled.toFixed(digits))>=1000) { // Check for rounding to next exponent
    scaled /= 1000;
    expK += 1;
  }

  var SI_SYMBOLS = "apμm ТМБTPE";
  var BASE0_OFFSET = SI_SYMBOLS.indexOf(' ');

  if (expK + BASE0_OFFSET>=SI_SYMBOLS.length) { // Bound check
    expK = SI_SYMBOLS.length-1 - BASE0_OFFSET;
    scaled = number / Math.pow(1000, expK);
  }
  else if (expK + BASE0_OFFSET < 0) return 0;  // Too small

  return scaled.toFixed(digits).replace(/(\.|(\..*?))0+$/,'$2') + SI_SYMBOLS[expK+BASE0_OFFSET].trim();
}
