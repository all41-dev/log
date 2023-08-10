alter table logEntry modify message longtext null;
alter table logEntry modify callStack longtext null;

alter table meta modify `value` longtext null;
