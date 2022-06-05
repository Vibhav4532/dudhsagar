CREATE TABLE Users (
Username varchar(255) NOT NULL,
UserEmail varchar(255) NOT NULL,
`Password` varchar(255) NOT NULL,
Userrole varchar(255) NOT NULL,
PRIMARY KEY (UserEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Drivers (
FirstName varchar(255) NOT NULL,
LastName varchar(255) NOT NULL,
LicenceNo int(10) NOT NULL,
MobileNo int(10) NOT NULL,
Email varchar(255) NOT NULL,
`Password` varchar(255) NOT NULL,
Userrole varchar(255) NOT NULL,
PRIMARY KEY (LicenceNo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Vehicles (
VehicleId int(11) NOT NULL AUTO_INCREMENT,
VehicleNo varchar(255) NOT NULL,
Model varchar(255) NOT NULL,
Seats int(10) NOT NULL,
PRIMARY KEY (VehicleId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE DriverVehicle (
VehicleId int(11) NOT NULL,
LicenceNo int(10) NOT NULL,
FOREIGN KEY (VehicleId) references Vehicles(VehicleId),
FOREIGN KEY (LicenceNo) references Drivers(LicenceNo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

drop Table DriverVehicle;
Drop TABLE Vehicles;
DROP TABLE users;
DROP TABLE Bookings;
DROP TABLE Drivers;
alter table users add column userrole varchar(255) after password;

alter table users drop UserRole; 

select * from users;

insert into users values ('Admin','admin99@gmail.com','8f60c8102d29fcd525162d02eed4566b', 'ADMIN' );

insert into users values ('Swapnil','swapnil@gmail.com','8f60c8102d29fcd525162d02eed4566b', 'CUSTOMER' );
insert into users values ('Rahesh','rahesh@gmail.com','8f60c8102d29fcd525162d02eed4566b', 'CUSTOMER' );


commit;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

flush privileges;

delete from users where username = 'Swapnil';

delete from users where username = 'hi';




SELECT * From Bookings WHERE UserEmail="vibhav@gmail.com";


 CREATE TABLE Bookings (
 BookingId int(11) NOT NULL AUTO_INCREMENT,
UserEmail  varchar(255) NOT NULL,
TransactionId varchar(36) NOT NULL,
`DateTime` DATETIME NOT NULL,
Seats int(11) NOT NULL,
Primary key (BookingId),
FOREIGN KEY (UserEmail) REFERENCES users(UserEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Insert into Bookings (UserEmail,TransactionId,`DateTime`,Seats) values('swapnil@gmail.com',uuid(), '2022-07-30 12:40:00',2);
Insert into Bookings (UserEmail,TransactionId,`DateTime`,Seats) values('akshay@gmail.com',uuid(), '2022-06-20 10:20:00',4);

Insert into Bookings values(3,'gaonkarsanjay80@gmail.com',44567824, '2022-04-26 12:55:00',8);

Insert into Bookings values(7,'akshay@gmail.com',256763, '2022-05-10 12:30:00',7);