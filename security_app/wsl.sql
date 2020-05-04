create database Outgoing;
use Outgoing;

CREATE TABLE IF NOT EXISTS Login(
id int(200) NOT NULL AUTO_INCREMENT,
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
role varchar(255) NOT NULL,
PRIMARY KEY (id)
)ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

insert into Login values(1,'shashank@gmail.com','shashank','warden');
insert into Login values(2,'mohit@gmail.com','mohit','guard');
insert into Login values(3,'archit@gmail.com','archit','student');

CREATE TABLE IF NOT EXISTS Student(
roll_no varchar(255) NOT NULL,
name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
contact bigint NOT NULL,
hostel_name varchar(255) NOT NULL,
room_no int(100) NOT NULL,
parents_email varchar(255) NOT NULL,
PRIMARY KEY (roll_no),
CONSTRAINT fk_email FOREIGN KEY (email) REFERENCES Login(email)
ON DELETE CASCADE
)ENGINE=MyISAM  DEFAULT CHARSET=latin1;

insert into Student values('MT2019026','archit','archit@gmail.com',9149266884,'Bhaskara',470,'semwal@gmail.com');

CREATE TABLE IF NOT EXISTS Approve(
id int(255) NOT NULL,
roll_no varchar(255) NOT NULL,
parents_contact int(255) NOT NULL,
departure DATE NOT NULL,
reason varchar(3000) NOT NULL,
status varchar(200) NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_roll FOREIGN KEY (roll_no) REFERENCES Student(roll_no)
ON DELETE CASCADE
)ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Record(
id int(255) NOT NULL,
roll_no varchar(255) NOT NULL,
entry DATETIME NOT NULL,
exit DATETIME NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_roll1 FOREIGN KEY (roll_no) REFERENCES Student(roll_no)
ON DELETE CASCADE
)ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS Leave(
id int(255) NOT NULL,
roll_no varchar(255) NOT NULL,
address varchar(255) NOT NULL,
transport varchar(255) NOT NULL,
pnr_no varchar(255) NOT NULL,
status varchar(200) NOT NULL,
entry DATETIME NOT NULL,
exit DATETIME NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_roll2 FOREIGN KEY (roll_no) REFERENCES Student(roll_no)
ON DELETE CASCADE
)ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS Parking(
id int(200) NOT NULL,
name varchar(255) NOT NULL,
entry DATETIME NOT NULL,
exit DATETIME NOT NULL,
parking_no int(255) NOT NULL,
vehicle_no varchar(200) NOT NULL,
PRIMARY KEY (id),
)ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;