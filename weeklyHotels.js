db=db.getSiblingDB('expedia-reviews');
rs.slaveOk();

var temp_date_obj = new Date();
printjson ("current date " + temp_date_obj);

temp_date_obj.setHours(0,0,0,0);
temp_date_obj.setDate(temp_date_obj.getDate() - 7 );
InputDate = new Date(temp_date_obj.toISOString()) ;

printjson ("current date " + InputDate);


var hotelsTrigger = db.reviewsTriggers.find({"rt":3}).count();
printjson ( " Total hotelTrigger : " + hotelTrigger);
var hotelTriggerCurrentWeek = db.reviewsTriggers.find({"rt":3,"ms":4,"cr":{"$gte": InputDate}}).count()
printjson ( " Current week hotelTrigger : " + hotelTriggerCurrentWeek );


var hotelmails = db.RTRResponseTracker.find({"res.rt":3}).count();
printjson ( " Total mails sent for hotels : " + hotelmails );
var hotelmailsCurrentWeek = db.RTRResponseTracker.find({"res.rt":3,"cr":{"$gte": InputDate}}).count()
printjson ( " mails sent for hotels CurrentWeek : " + hotelmailsCurrentWeek);