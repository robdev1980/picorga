exports.makePath = function(file, dateStr) {
  // e.g.: 2012:07:06 11:33:31
  var splitDateTime = dateStr.split(' '),
      splitDate,
      ret;
  
  if (splitDateTime && splitDateTime.length === 2) {
    splitDate = splitDateTime[0].split(':');
    if (splitDate && splitDate.length === 3) {
      ret = '/' + splitDate.join('/');
    } else {
      dateFormatError(file, dateStr);
    }
  } else {
    dateFormatError(file, dateStr);
  }
  
  return ret;
}

function dateFormatError(file, dateStr) {
  console.log("Error: date format not valid: ", dateStr, " (", file, ")" );
}