create table meta
(
	logEntryUuid char(36) not null,
	`key` varchar(200) not null,
	value varchar(200) not null,
	constraint meta_logEntry_id_fk
		foreign key (logEntryUuid) references logEntry (id)
			on update cascade on delete cascade
);
