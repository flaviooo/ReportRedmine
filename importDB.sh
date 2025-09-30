#!/bin/sh

password=$passwd
pathHome=/tmp/home/admincsea/dump/archivio
sqlfile=backup_$(date +%d-%m-%Y).sql
mysql --default-character-set='utf8' bitnami_redmine < $pathHome/$sqlfile 2>$pathHome/bk_dump_log.log
echo $(date -u) " Import effettuato. "
#cd $pathHome/archivio
#zipfile=$pathHome/archivio/backup_$(date +%d-%m-%Y).zip
#zip $zipfile $pathHome/archivio/$sqlfile
#rm -f $pathHome/archivio/$sqlfile
ls -l
