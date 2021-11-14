function main() {
  currenthall='Laurel';
  var currentid = CardService.newTextInput();
  log(currentid,currenthall);
  var pickupid = CardService.newTextInput();
  pickup(currentid,pickupid);
}

function log (currentid, currenthall) {
  currenthall='Laurel'
  readname=ocr(geturl());
  datas=checkIDinDB(readname)
  Logger.log(datas[1,2,3,4,5,6,7,8])
  hall=datas[3];
floor=datas[4];
room=datas[5]

  //[false, Rufus, Corgerson, Redwood, 1.0, 101.0, rp123@njit.edu, 1.23456789E9, false, ;0000000000000163471?]
  var packageid = newpackageid(hall,floor,room)
  var ss = SpreadsheetApp.openById("12wmsm800NWwMkUFIuPj5bHvrB3I13mGZhqyQlzWp84o");
  var row=getFirstEmptyRowByColumnArray(ss);
  ss.getRange('A' +row.toString()).setValue(packageid);
   ss.getRange('B' +row.toString()).setValue("Available");
    ss.getRange('C' +row.toString()).setValue(currenthall);
     ss.getRange('D' +row.toString()).setValue(geturl());
     ss.getRange('E' +row.toString()).setValue(datas[1]);
      ss.getRange('F' +row.toString()).setValue(datas[2]);
       ss.getRange('G' +row.toString()).setValue(datas[3]);
        ss.getRange('H' +row.toString()).setValue(datas[4]);
         ss.getRange('I' +row.toString()).setValue(datas[5]);
          ss.getRange('J' +row.toString()).setValue(datas[6]);
           ss.getRange('K' +row.toString()).setValue(datas[7]);
            ss.getRange('L' +row.toString()).setValue(datas[8]);
             ss.getRange('M' +row.toString()).setValue(datas[9]);
      ss.getRange('N' +row.toString()).setValue( new Date()); 
     ss.getRange('O' +row.toString()).setValue(currentid);
     ss.getRange('P' +row.toString() + ":" + 'T' +row.toString() ).setValue(["0","0","0","0","0"]);
     ss.getRange('U' +row.toString()).setValue("n/a");
     sendEmailFirst(datas[6])
     sendSms(datas[7], "Hey you have a package to be picked up! Come by the office at " + datas[3] + "!")
}
function newpackageid(hall,floor,room) {
  var ssnum = SpreadsheetApp.openById("1qxUT0jes8l0XYQGBtsiTDMHhgygeDvg_uCpkxFvdfFY");
  var numrange=ssnum.getRange('A:A');
var v= numrange.getValues();
var strmatch = hall[0] + "0" + floor.toString() 
Logger.log(v[0,1] );

  for (var i=0;i<=v.length-1;i++) {
        if((v[0,i]).indexOf(strmatch) > -1) {
            
            outputdata = parseInt(    ssnum.getRange('B:B').getValues()[0,i]) +1;
            Logger.log(ssnum.getRange('B' + i.toString()));
            ssnum.getRange('B' + (i+1).toString()).setValue(outputdata);
            break;
        } else if( v[0,i] =="" ){
          outputdata=1   
          ssnum.getRange('A' + i.toString()).setValue(strmatch);
          ssnum.getRange('B' + i.toString()).setValue(outputdata);
        break;
        
        }
    }
    return strmatch+"-000"+(outputdata).toString();
}

function pickup (operatorid,pickerid) {

}
function view () {

}
function connectDB () {

}
function checkIDinDB(inputname) {
  var outputdata =" ";
  var ssdb = SpreadsheetApp.openById("17otT55Et-eFWL0Qa5wLwcXD8PYEbA5_Bg2lTAi03jKQ");
  var ssspack = SpreadsheetApp.openById("12wmsm800NWwMkUFIuPj5bHvrB3I13mGZhqyQlzWp84o");
  var ssnum = SpreadsheetApp.openById("12wmsm800NWwMkUFIuPj5bHvrB3I13mGZhqyQlzWp84o");
  var dbrange = ssdb.getRange('B:C');
  var v= dbrange.getValues();
  for(var i=v.length-1;i>=0;i--) {
        if((v[0,i].join(" ")).indexOf(inputname) > -1) {
            outputdata = ssdb.getRange('A:J').getValues()[0,i];
            break;
        } else if (v[0,i][1].indexOf(inputname) > -1) {
          outputdata = outputdata + (ssdb.getRange('A:J').getValues()[0,i].toString()          )
        }
    }
    return outputdata;
};
  function getFirstEmptyRowByColumnArray(ssdb) {
  var column = ssdb.getRange('A:A');
  var values = column.getValues(); // get all data in one call
  var ct = 0;
  while ( values[ct] && values[ct][0] != "" ) {
    ct++;
  }
  return (ct+1);
}
function geturl () {
  return "https://assets.aboutamazon.com/dims4/default/d3f79f1/2147483647/strip/true/crop/2999x3503+0+0/resize/1283x1499!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F1f%2F41%2F144becc548418c82c6def60dbf9d%2F20190214amznshippinglabel-js-01-labeled-r2.jpg"; 
}
function ocr(url) {
 if (url != undefined && url != "") {
    var imageBlob = UrlFetchApp.fetch(url).getBlob();
    var resource = {
          title: imageBlob.getName(),
          mimeType: imageBlob.getContentType()
    };
    var options = {
        ocr: true
    };   
    try {
var docFile = DriveApp.createFile(resource.title, imageBlob, resource.mimeType).getId();
    var doc =  DriveApp.getFileById(docFile);
    Logger.log(doc)
    var text = doc.getAttributes();
    Name().getBody().getText();
    DriveApp.getFileById(docFile).setTrashed(False);
    return (text);
    }
    catch {
      Logger.log(doc + "rufus")
       return ("Rufus Corgerson");
    }
    
 }else {
    return ("request error");
 }
}


function comparePackages (){

}

function check1or2contacts (email1, email2) {
if (email1==email2) {
sendEmailSelf(email1);
} else {
sendEmailFriend(email2);
sendEmailSelf(email1);
}

}

function sendEmailFirst(phonenumber,emailaddress) {
  subject="Pink Panther Polish";
  body="You have an appointment waiting to be booked! Get your nails done soon! "
  GmailApp.sendEmail(emailaddress, subject, body);
  if (textenable==TRUE) {
  sendSms (phonenumber,body)
  }


}
function sendEmailSelf(phonenumber,emailaddress) {
  subject="Pink Panther Polish";
  body="Thank you for booking your appointment! Get your nails done soon! "
  GmailApp.sendEmail(emailaddress, subject, body);
  if (textenable==TRUE) {
  sendSms (phonenumber,body)
  }


}

function sendEmailFriend(textenable,phonenumber,emailaddress) {
  subject="Pink Panther Polish";
  body="Your friend booked an appointment! You should also get your nails done soon! "
  GmailApp.sendEmail(emailaddress, subject, body);
  if (textenable==TRUE) {
  sendSms (phonenumber,body)
  }

}

function sendSms(to, body) {
  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/ACf7a0692de54011f9d722a9e28f8f87a4/Messages.json";

  var payload = {
    "To": to,
    "Body" : body,
    "From" : "+18482727235"
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };

  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode("ACf7a0692de54011f9d722a9e28f8f87a4:e9881aeaa918a33a23bc423f34e63bfc")
  };

  UrlFetchApp.fetch(messages_url, options);
}


function transferBetweenBuildings (packageid, oldhall, newhall,previousdata) {


}

function checkAdmin(swipeIDnumber=";0000000000000166571?") {
  var ss = SpreadsheetApp.getActiveSheet();
  var textFinder = ss.createTextFinder(swipeIDnumber);
  Logger.log(textFinder);

}

