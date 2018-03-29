// User
db.User.drop();
db.createCollection('User');
db.User.insert({
  username: 'xyz',
  firstName: '',
  lastName: '',
  password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
  email: 'xyz@email.com',
  image: 'xyz_profile02.jpg',
  imageUrl: 'http://localhost:5000/api/images/xyz',
  aboutMe: "",

});
db.User.insert({
  username: 'abc',
  firstName: 'Chris',
  lastName: 'Li',
  password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
  email: 'abc@world.com',
  image: 'abc_profile01.jpg',
  imageUrl: 'http://localhost:5000/api/images/abc',
  aboutMe: "This is Me",
});

// Project
db.Project.drop();
db.createCollection('Project');
db.Project.insert({

  title: 'project 1',
  description: 'This is Project 1',
  employerId: '5abbd8a696e307a62d2c654c',
  minBudget: 300.0,
  maxBudget: 400.0,
  startDate: new Date('2018-01-23')
});
db.Project.insert({

  title: 'project 2',
  description: 'Hello hello project 2',
  employerId: '5abbd8a696e307a62d2c654c',
  minBudget: 400.0,
  maxBudget: 600.0,
  startDate: new Date('2017-12-24')
});
db.Project.insert({

  title: 'project 3',
  description: 'Here again project 3',
  employerId: '5abbd8a696e307a62d2c654d',
  minBudget: 500.0,
  maxBudget: 800.0,
  startDate: new Date('2018-02-12')
});