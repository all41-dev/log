create table logEntry
(
	id char(36) not null
		primary key,
	levelCode varchar(50) null,
	message varchar(500) null,
	callStack text null,
	createdAt timestamp default current_timestamp() not null on update current_timestamp(),
	deletedAt timestamp null,
	updatedAt timestamp default '0000-00-00 00:00:00' not null
);
