db=db.getSiblingDB('expedia-reviews');
rs.slaveOk();

var temp_date_obj = new Date();
printjson ("current date " + temp_date_obj);

temp_date_obj.setHours(0,0,0,0);
temp_date_obj.setDate(temp_date_obj.getDate() - 7 );
InputDate = new Date(temp_date_obj.toISOString()) ;

printjson ("current date " + InputDate);


var lxTrigger = db.reviewsTriggers.find({"rt":1}).count();
printjson ( " Total lxTrigger : " + lxTrigger);
var lxTriggerCurrentWeek = db.reviewsTriggers.find({"rt":1,"ms":4,"upd":{"$gte": InputDate}}).count()
printjson ( " Current week lxTrigger : " + lxTriggerCurrentWeek );


var carTrigger = db.reviewsTriggers.find({"rt":2}).count();
printjson ( " Total car trigger : " + carTrigger);
var carTriggerCurrentWeek = db.reviewsTriggers.find({"rt":2,"ms":4,"upd":{"$gte": InputDate}}).count()
printjson ( " Current week carTrigger : " + carTriggerCurrentWeek );


var gtTrigger = db.reviewsTriggers.find({"rt":5}).count();
printjson ( " Total gtTrigger : " + gtTrigger);
var gtTriggerCurrentWeek = db.reviewsTriggers.find({"rt":5,"ms":4,"upd":{"$gte": InputDate}}).count()
printjson ( " Current week gtTrigger : " + gtTriggerCurrentWeek );


var lxmails = db.RTRResponseTracker.find({"res.rt":1}).count();
printjson ( " Total mails sent for lxTrigger : " + lxmails );
var lxmailsCurrentWeek = db.RTRResponseTracker.find({"res.rt":1,"cr":{"$gte": InputDate}}).count()
printjson ( " mails sent for lxmailsCurrentWeek : " + lxmailsCurrentWeek);


var carmails = db.RTRResponseTracker.find({"res.rt":2}).count();
printjson ( " Total mails sent for cars : " + carmails);
var carmailsCurrentWeek = db.RTRResponseTracker.find({"res.rt":2,"cr":{"$gte": InputDate}}).count()
printjson ( " mails sent for carmailsCurrentWeek : " + carmailsCurrentWeek);

var gtmails = db.RTRResponseTracker.find({"res.rt":5}).count();
printjson ( " Total mails sent for GT : " + gtmails);
var gtmailsCurrentWeek = db.RTRResponseTracker.find({"res.rt":5,"cr":{"$gte": InputDate}}).count()
printjson ( " mails sent for gtmailsCurrentWeek : " + gtmailsCurrentWeek);