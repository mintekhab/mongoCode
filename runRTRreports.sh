#!/bin/bash

##############################################################################
##                     set env variables                                    ## 
##############################################################################
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

#############################################################################
##                     set debug on                                       ##
#############################################################################

set -v

##############################################################################
##                     create filename appended with timestamp              ## 
##############################################################################

rtrFligtserver=10.8.135.209
rtrHotelserver=10.8.135.216
rtrLxCarGtserver=10.8.6.6

basefilename=rtr
basedir=/usr/local/scripts/
filedir=/tmp/rtrReports/
current_time=$(date "+%Y.%m.%d-%H.%M.%S")
rtrFlight=${filedir}${basefilename}_flights_${current_time}.out
rtrHotel=${filedir}${basefilename}_hotels_${current_time}.out
rtrLxCarGt=${filedir}${basefilename}_lxcargt_${current_time}.out
s3bucket=s3://social-rtr/rtr-reports/



##############################################################################
##                   processing older files and directories                 ##
##############################################################################
if [ ! -d "$filedir" ]; then
        mkdir -p "$filedir"
fi

find ${filedir}${basefilename}* -mtime +30 -print | xargs rm -rf 


##############################################################################
##                  running mongo scripts                                   ##
##############################################################################

mongo -u reviews -p expedia123 admin --host $rtrFligtserver   < ${basedir}weeklyFlights.js > $rtrFlight
mongo -u reviews -p expedia123 admin --host $rtrHotelserver   < ${basedir}weeklyHotels.js > $rtrHotel
mongo -u reviews -p expedia123 admin --host $rtrLxCarGtserver < ${basedir}weeklyLxCarsGt.js > $rtrLxCarGt

###############################################################################
##                 upload to s3 bucket social-rtr/rtr-reports                ## 
###############################################################################

aws s3 cp $rtrFlight $s3bucket
aws s3 cp $rtrHotel $s3bucket
aws s3 cp $rtrLxCarGt $s3bucket