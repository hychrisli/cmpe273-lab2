DROP DATABASE IF EXISTS flc;
CREATE DATABASE flc;
GRANT ALL on flc.* to 'flcuser'@'localhost';

DROP DATABASE IF EXISTS flctest;
CREATE DATABASE flctest;
GRANT ALL on flctest.* to 'flcuser'@'localhost';