#!/bin/sh

password=$passwd
# pathHome=/tmp/home/admincsea/dump/archivio
if [ -z "$1" ]; then
  echo "Uso: $0 nome_file.sql"
  exit 1
fi
sqlfile="$1"

# Verifica che il file esista
if [ ! -f "$sqlfile" ]; then
  echo "Errore: il file '$sqlfile' non esiste."
  exit 1
fi

#sqlfile=backup_$(date +%d-%m-%Y).sql
mysql --default-character-set='utf8' bitnami_redmine < $sqlfile
echo $(date -u) " Import effettuato. "
#cd $pathHome/archivio
#zipfile=$pathHome/archivio/backup_$(date +%d-%m-%Y).zip
#zip $zipfile $pathHome/archivio/$sqlfile
#rm -f $pathHome/archivio/$sqlfile
ls -l
