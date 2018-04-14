
// User
db.User.drop();
db.createCollection('User');
db.User.insert([
  {
  username: 'xyz',
  firstName: 'Bill',
  lastName: 'Superman',
  password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
  email: 'xyz@email.com',
  aboutMe: "",
  },
  {
    username: 'abc',
    firstName: 'Chris',
    lastName: 'Li',
    password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
    email: 'abc@world.com',
    aboutMe: "This is Me",
  },
  {
    username: 'wer',
    firstName: 'Walter',
    lastName: 'Smith',
    password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
    email: 'walter@toysrus.com',
    aboutMe: "Hi, y'all",
  },
  {
    username: 'lat',
    firstName: 'Lauren',
    lastName: 'Tyler',
    password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
    email: 'lat@myspace.com',
    aboutMe: "Yes, Please",
  },
  {
    username: 'lot',
    firstName: 'Lorde',
    lastName: 'Third',
    password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
    email: 'lot@netview.com',
    aboutMe: "Be Hold",
  },
  {
    username: 'Yet',
    firstName: 'Yoki',
    lastName: 'Tammy',
    password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
    email: 'yet@aol.com',
    aboutMe: "Howdy, Howdy",
  },
  {
    username: 'MeToo',
    firstName: 'Marry',
    lastName: 'James',
    password: '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6',
    email: 'marry@yahoo.com',
    aboutMe: "Merry Christmas, Everyone",
  },
]);

// Skill
db.Skill.drop();
db.createCollection('Skill');
db.Skill.insert([
  {skillName: 'Java'},
  {skillName: 'Python'},
  {skillName: 'Node.js'},
  {skillName: 'Express.js'},
  {skillName: 'React'},
  {skillName: 'HTML5'},
  {skillName: 'AngularJS'},
  {skillName: 'MySQL'},
  {skillName: 'Oracle'},
  {skillName: 'Spring'},
  {skillName: 'JUnit'},
  {skillName: 'Spark'},
  {skillName: 'Hadoop'},
  {skillName: 'Kafka'},
  {skillName: 'AWS'},
  {skillName: 'GCP'},
  {skillName: 'PHP'},
  {skillName: 'Apache'},
  {skillName: 'Linux'},
  {skillName: 'Object-C'},
  {skillName: 'C'},
  {skillName: 'C++'},
  {skillName: 'C#'},
  {skillName: 'Android'},
  {skillName: 'iOS'},
  {skillName: 'JQuery'},
  {skillName: 'AJAX'},
  {skillName: 'RPC'},
]);

// user skill
db.UserSkill.drop();
db.createCollection('UserSkill');
db.UserSkill.insert([
  {
    userId: db.User.findOne({username: 'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Java'})._id.str,
    skillName: 'Java'
  },
  {
    userId: db.User.findOne({username: 'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName: 'JQuery'})._id.str,
    skillName: 'JQuery'
  },
  {
    userId: db.User.findOne({username: 'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Spark'})._id.str,
    skillName: 'Spark'
  },
  {
    userId: db.User.findOne({username: 'xyz'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Oracle'})._id.str,
    skillName: 'Oracle'
  },
  {
    userId: db.User.findOne({username: 'abc'})._id.str,
    skillId: db.Skill.findOne({skillName: 'AWS'})._id.str,
    skillName: 'AWS'
  },
  {
    userId: db.User.findOne({username: 'abc'})._id.str,
    skillId: db.Skill.findOne({skillName: 'GCP'})._id.str,
    skillName: 'GCP'
  },
  {
    userId: db.User.findOne({username: 'abc'})._id.str,
    skillId: db.Skill.findOne({skillName: 'AJAX'})._id.str,
    skillName: 'AJAX'
  },
  {
    userId: db.User.findOne({username: 'abc'})._id.str,
    skillId: db.Skill.findOne({skillName: 'JQuery'})._id.str,
    skillName: 'JQuery'
  },
  {
    userId: db.User.findOne({username: 'wer'})._id.str,
    skillId: db.Skill.findOne({skillName: 'JQuery'})._id.str,
    skillName: 'JQuery'
  },
  {
    userId: db.User.findOne({username: 'wer'})._id.str,
    skillId: db.Skill.findOne({skillName: 'C++'})._id.str,
    skillName: 'C++'
  },
  {
    userId: db.User.findOne({username: 'wer'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Android'})._id.str,
    skillName: 'Android'
  },
  {
    userId: db.User.findOne({username: 'wer'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Linux'})._id.str,
    skillName: 'Linux'
  },
  {
    userId: db.User.findOne({username: 'lat'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Kafka'})._id.str,
    skillName: 'JQuery'
  },
  {
    userId: db.User.findOne({username: 'lat'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Hadoop'})._id.str,
    skillName: 'C++'
  },
  {
    userId: db.User.findOne({username: 'lat'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Android'})._id.str,
    skillName: 'Android'
  },
  {
    userId: db.User.findOne({username: 'lat'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Linux'})._id.str,
    skillName: 'Linux'
  },
  {
    userId: db.User.findOne({username: 'lat'})._id.str,
    skillId: db.Skill.findOne({skillName: 'JQuery'})._id.str,
    skillName: 'JQuery'
  },
]);


// Project
db.Project.drop();
db.createCollection('Project');
db.Project.insert([
  {
    title: 'project 1',
    description: 'This is Project 1',
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    minBudget: 300.0,
    maxBudget: 400.0,
    startDate: new Date('2018-01-23'),
    bidNum: 0,
    skills: 'C++, Android, JQuery',
    status: 0,
  },
  {
    title: 'project 2',
    description: 'Hello hello project 2',
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    minBudget: 400.0,
    maxBudget: 600.0,
    startDate: new Date('2017-12-24'),
    bidNum: 5,
    skills: 'GCP',
    status: 0,
  },
  {
    title: 'project 3',
    description: 'Here again project 3',
    employerId: db.User.findOne({username: 'abc'})._id.str,
    minBudget: 500.0,
    maxBudget: 800.0,
    startDate: new Date('2018-02-12'),
    bidNum: 2,
    skills: 'Spark, Oracle, JQuery',
    status: 0,
  },
  {
    title: 'project 4',
    description: 'Here again project 3',
    employerId: db.User.findOne({username: 'wer'})._id.str,
    minBudget: 540.0,
    maxBudget: 1200.0,
    startDate: new Date('2018-03-12'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'Save the world',
    description: 'Let us save the world with love, or something else. Money?',
    employerId: db.User.findOne({username: 'wer'})._id.str,
    minBudget: 300.0,
    maxBudget: 700.0,
    startDate: new Date('2018-04-12'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'Exciting Old Project',
    description: 'Are you excited about new projects or old projects? Come take a look on ours',
    employerId: db.User.findOne({username: 'abc'})._id.str,
    minBudget: 458.0,
    maxBudget: 999.0,
    startDate: new Date('2018-04-21'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'I Beg Your Pardon',
    description: 'How to beg pardons? Well, our project will give you some clue',
    employerId: db.User.findOne({username: 'lat'})._id.str,
    minBudget: 478.0,
    maxBudget: 987.0,
    startDate: new Date('2018-05-04'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'Plant a Bird Tree',
    description: 'Can someone please plant a tree that grows birds APSP?! I need you help',
    employerId: db.User.findOne({username: 'lat'})._id.str,
    minBudget: 478.0,
    maxBudget: 987.0,
    startDate: new Date('2018-05-11'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'Push your car to office',
    description: 'Tips to push my Toyota Camry 1999 to my workplace. This must be special',
    employerId: db.User.findOne({username: 'lot'})._id.str,
    minBudget: 200.0,
    maxBudget: 300.0,
    startDate: new Date('2018-03-10'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'Help needed to refuse to help',
    description: 'Can someone give me advice to not help anyone? Please :)',
    employerId: db.User.findOne({username: 'lot'})._id.str,
    minBudget: 350.0,
    maxBudget: 567.0,
    startDate: new Date('2018-04-30'),
    bidNum: 0,
    skills: '',
    status: 0,
  },
  {
    title: 'How to Survive in Concrete Jungle',
    description: 'They say if you make it in the concrete jungle, you can make it anywhere',
    employerId: db.User.findOne({username: 'MeToo'})._id.str,
    minBudget: 258.0,
    maxBudget: 369.0,
    startDate: new Date('2018-05-30'),
    bidNum: 0,
    skills: '',
    status: 0,
  }
]);

// Project Skill
db.ProjectSkill.drop();
db.createCollection('ProjectSkill');
db.ProjectSkill.insert([
  {
    projectId: db.Project.findOne({title: 'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName: 'C++'})._id.str,
    skillName: 'C++'
  },
  {
    projectId: db.Project.findOne({title: 'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName: 'JQuery'})._id.str,
    skillName: 'JQuery'
  },
  {
    projectId: db.Project.findOne({title: 'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Android'})._id.str,
    skillName: 'Android'
  },
  {
    projectId: db.Project.findOne({title: 'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName: 'GCP'})._id.str,
    skillName: 'Android'
  },
  {
    projectId: db.Project.findOne({title: 'project 1'})._id.str,
    skillId: db.Skill.findOne({skillName: 'AJAX'})._id.str,
    skillName: 'Android'
  },
  {
    projectId: db.Project.findOne({title: 'project 3'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Spark'})._id.str,
    skillName: 'Spark'
  },
  {
    projectId: db.Project.findOne({title: 'project 3'})._id.str,
    skillId: db.Skill.findOne({skillName: 'Oracle'})._id.str,
    skillName: 'Oracle'
  },
  {
    projectId: db.Project.findOne({title: 'project 3'})._id.str,
    skillId: db.Skill.findOne({skillName: 'JQuery'})._id.str,
    skillName: 'JQuery'
  },
  {
    projectId: db.Project.findOne({title: 'project 3'})._id.str,
    skillId: db.Skill.findOne({skillName: 'AWS'})._id.str,
    skillName: 'AWS'
  },
  {
    projectId: db.Project.findOne({title: 'project 2'})._id.str,
    skillId: db.Skill.findOne({skillName: 'GCP'})._id.str,
    skillName: 'GCP'
  }
]);


// Bid
db.Bid.drop();
db.createCollection('Bid');
db.Bid.insert([
  {
    userId: db.User.findOne({username: 'xyz'})._id.str,
    projectId: db.Project.findOne({title: 'project 3'})._id.str,
    employerId: db.User.findOne({username: 'abc'})._id.str,
    bidPrice: 600,
    bidDays: 80,
    isActive: true,
  },
  {
    userId: db.User.findOne({username: 'wer'})._id.str,
    projectId: db.Project.findOne({title: 'project 3'})._id.str,
    employerId: db.User.findOne({username: 'abc'})._id.str,
    bidPrice: 700,
    bidDays: 100,
    isActive: true,
  },
  {
    userId: db.User.findOne({username: 'abc'})._id.str,
    projectId: db.Project.findOne({title: 'project 2'})._id.str,
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    bidPrice: 350,
    bidDays: 60,
    isActive: true
  },
  {
    userId: db.User.findOne({username: 'wer'})._id.str,
    projectId: db.Project.findOne({title: 'project 2'})._id.str,
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    bidPrice: 430,
    bidDays: 65,
    isActive: true
  },
  {
    userId: db.User.findOne({username: 'lot'})._id.str,
    projectId: db.Project.findOne({title: 'project 2'})._id.str,
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    bidPrice: 550,
    bidDays: 50,
    isActive: true
  },
  {
    userId: db.User.findOne({username: 'lat'})._id.str,
    projectId: db.Project.findOne({title: 'project 2'})._id.str,
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    bidPrice: 660,
    bidDays: 60,
    isActive: true
  },
  {
    userId: db.User.findOne({username: 'Yet'})._id.str,
    projectId: db.Project.findOne({title: 'project 2'})._id.str,
    employerId: db.User.findOne({username: 'xyz'})._id.str,
    bidPrice: 700,
    bidDays: 50,
    isActive: true
  }
]);

db.Session.drop();
db.createCollection('Session');


// image
db.Image.drop();
db.createCollection('Image');
db.Image.insert([
  {
    userId: db.User.findOne({username: 'xyz'})._id.str,
    username: 'xyz',
    base64Img: 'data:image/jpg;base64,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'
  },
  {
    userId: db.User.findOne({username: 'abc'})._id.str,
    username: 'abc',
    base64Img: 'data:image/png;base64,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'
  }
]);