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