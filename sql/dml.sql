INSERT INTO USER (username, password, email, image, image_url)
VALUES ('xyz', '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6', 'xyz@email.com',
        'xyz_profile02.jpg', 'http://localhost:5000/api/images/xyz');
INSERT INTO USER (username, first_name, last_name, password, email, about_me, image, image_url)
VALUES
  ('abc', 'Chris', 'Li', '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6', 'abc@world.com',
   'This is Me', 'abc_profile01.jpg', 'http://localhost:5000/api/images/abc');

INSERT INTO PROJECT (title, description, employer_id, min_budget, max_budget, start_date)
VALUES ('Project 1', 'This is Project 1', 1, 300.0, 400.0, STR_TO_DATE('01/23/2018', '%m/%d/%Y'));
INSERT INTO PROJECT (title, description, employer_id, min_budget, max_budget, start_date)
VALUES ('Project 2', 'Hello hello project 2', 1, 400.0, 600.0, STR_TO_DATE('12/24/2017', '%m/%d/%Y'));
INSERT INTO PROJECT (title, description, employer_id, min_budget, max_budget, start_date)
VALUES ('Project 3', 'Here again project 3', 2, 500.0, 800.0, STR_TO_DATE('02/12/2018', '%m/%d/%Y'));

INSERT INTO PROJECT_BID(user_id, project_id, employer_id, bid_price, bid_days)
    VALUES(1, 3, 2, 600, 80), (2, 1, 1, 350, 60);


INSERT INTO SKILL (skill_name)
VALUES ('Java'), ('Python'), ('Node.js'), ('Express.js'), ('React'), ('HTML5'), ('AngularJS'), ('MySQL'),
  ('Oracle'), ('Spring'), ('JUnit'), ('Spark'), ('Hadoop'), ('Kafka'), ('AWS'), ('GCP'), ('PHP'), ('Apache'),
  ('Linux'), ('Object-C'), ('C'), ('C++'), ('C#'), ('Android'), ('iOS'), ('JQuery'), ('AJAX'), ('RPC');

INSERT INTO PROJECT_SKILL (project_id, skill_id)
VALUES (1, 1), (1, 3), (1, 7), (2, 4), (2, 2), (2, 1), (3, 8), (3, 9);
