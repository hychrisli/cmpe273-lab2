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

// Skill
db.Skill.drop();
db.createCollection('Skill');
db.Skill.insert([
  {skillName : 'Java'},
  {skillName : 'Python'},
  {skillName : 'Node.js'},
  {skillName : 'Express.js'},
  {skillName : 'React'},
  {skillName : 'HTML5'},
  {skillName : 'AngularJS'},
  {skillName : 'MySQL'},
  {skillName : 'Oracle'},
  {skillName : 'Spring'},
  {skillName : 'JUnit'},
  {skillName : 'Spark'},
  {skillName : 'Hadoop'},
  {skillName : 'Kafka'},
  {skillName : 'AWS'},
  {skillName : 'GCP'},
  {skillName : 'PHP'},
  {skillName : 'Apache'},
  {skillName : 'Linux'},
  {skillName : 'Object-C'},
  {skillName : 'C'},
  {skillName : 'C++'},
  {skillName : 'C#'},
  {skillName : 'Android'},
  {skillName : 'iOS'},
  {skillName : 'JQuery'},
  {skillName : 'AJAX'},
  {skillName : 'RPC'},
]);

// user skill
db.UserSkill.drop();
db.createCollection('UserSkill');
db.UserSkill.insert([
  {
    userId: db.User.findOne({username:'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName:'Java'})._id.str,
  },
  {
    userId: db.User.findOne({username:'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName:'JQuery'})._id.str,
  },
  {
    userId: db.User.findOne({username:'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName:'Spark'})._id.str,
  },
  {
    userId: db.User.findOne({username:'abc'})._id.str,
    skillId: db.Skill.findOne({skillName:'AWS'})._id.str,
  },
  {
    userId: db.User.findOne({username:'abc'})._id.str,
    skillId: db.Skill.findOne({skillName:'GCP'})._id.str,
  }
]);


// Project
db.Project.drop();
db.createCollection('Project');
db.Project.insert([
  {
    title: 'project 1',
    description: 'This is Project 1',
    employerId: db.User.findOne({username:'xyz'})._id.str,
    minBudget: 300.0,
    maxBudget: 400.0,
    startDate: new Date('2018-01-23')
  },
  {
    title: 'project 2',
    description: 'Hello hello project 2',
    employerId: db.User.findOne({username:'xyz'})._id.str,
    minBudget: 400.0,
    maxBudget: 600.0,
    startDate: new Date('2017-12-24')
  },
  {
    title: 'project 3',
    description: 'Here again project 3',
    employerId: db.User.findOne({username:'abc'})._id.str,
    minBudget: 500.0,
    maxBudget: 800.0,
    startDate: new Date('2018-02-12')
  }
]);

// Project Skill
db.ProjctSkill.drop();
db.createCollection('ProjectSkill');
db.ProjectSkill.insert([
  {
    projectId: db.Project.findOne({title:'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName:'Java'})._id.str,
  },
  {
    projectId: db.Project.findOne({title:'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName:'JQuery'})._id.str,
  },
  {
    projectId: db.Project.findOne({title:'project 3'})._id.str,
    skillId: db.Skill.findOne({skillName:'Spark'})._id.str,
  },
  {
    projectId: db.Project.findOne({title:'project 3'})._id.str,
    skillId: db.Skill.findOne({skillName:'AWS'})._id.str,
  },
  {
    projectId: db.Project.findOne({title:'project 2'})._id.str,
    skillId: db.Skill.findOne({skillName:'GCP'})._id.str,
  }
]);