#!/bin/bash

echo "Please enter MySQL root password"
read -s PASSWORD
echo ${PASSWORD}

mysql -u root --password=${PASSWORD} < ./setup.sql
if [ $? -eq 0 ]
then
    echo "Successfully Create databases"
else
    echo "Failed to create databases"
    exit 1
fi

mysql flc -u root --password=${PASSWORD} < ./ddl.sql
if [ $? -gt 0 ]
then
    echo "Failed to create tables in flc"
    exit 1
fi
mysql flc -u root --password=${PASSWORD} < ./dml.sql
if [ $? -gt 0 ]
then
    echo "Failed to load data to flc"
    exit 1
fi


mysql flctest -u root --password=${PASSWORD} < ./ddl.sql
if [ $? -gt 0 ]
then
    echo "Failed to create tables in flctest"
    exit 1
fi

mysql flctest -u root --password=${PASSWORD} < ./dml.sql
if [ $? -gt 0 ]
then
    echo "Failed to load data to flctest"
    exit 1
fi

echo "Setup successful!"
