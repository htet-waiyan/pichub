exports.isValidEmail=function(email){
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return pattern.test(email);
}

exports.isValidUsername=function(username){
    var pattern=/^[a-zA-Z0-9-_]{2,15}$/i;
    return pattern.test(username);
}


