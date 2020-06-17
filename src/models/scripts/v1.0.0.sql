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

create table meta
(
	logEntryUuid char(36) not null,
	`key` varchar(200) not null,
	value varchar(200) not null,
	constraint meta_logEntry_id_fk
		foreign key (logEntryUuid) references logEntry (id)
			on update cascade on delete cascade
);

