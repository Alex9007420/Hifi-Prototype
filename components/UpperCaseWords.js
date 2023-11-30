const upperCaseWords = (string) => {
    var r = "";
    for (var i = 0; i < string.length; ++i) {
      if (i == 0 || string[i-1] == " ")
        r += string[i].toUpperCase();
      else
        r += string[i];
    }    
    return r;
};

export default upperCaseWords;