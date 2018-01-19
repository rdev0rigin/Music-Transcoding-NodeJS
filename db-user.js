use dcomp_store_root

db.addUser('dummyuser', 'dummysecret');

db.createUser({user:'adminNotYou', pwd:'itAdminME!', roles:[{role:'readWrite', db: 'admin'}]});
db.createUser({user:'dcompAdmin', pwd:'itAdminME2!', roles:[{role:'readWrite', db: 'dcomp-content-store'}]});

