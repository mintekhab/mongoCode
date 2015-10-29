db=db.getSiblingDB('expedia-reviews');
rs.slaveOk();

var temp_date_obj = new Date();
printjson ("current date " + temp_date_obj);

temp_date_obj.setHours(0,0,0,0);
temp_date_obj.setDate(temp_date_obj.getDate() - 7 );
InputDate = new Date(temp_date_obj.toISOString()) ;

printjson ("current date " + InputDate);


var flightTrigger = db.reviewsTriggers.find({"rt":4}).count();
printjson ( " Total flightTrigger : " + flightTrigger);
var flightTriggerCurrentWeek = db.reviewsTriggers.find({"rt":4,"cr":{"$gte": InputDate}}).count()
printjson ( " Current week flightTrigger : " + flightTriggerCurrentWeek );


var flightmails = db.RTRResponseTracker.find({"res.rt":4}).count();
printjson ( " Total mails sent for flights : " + flightmails  );
var flightmailsCurrentWeek = db.RTRResponseTracker.find({"res.rt":4,"cr":{"$gte": InputDate}}).count()
printjson ( " mails sent for flights CurrentWeek : " + flightmailsCurrentWeek);