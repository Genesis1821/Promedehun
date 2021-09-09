create database promedehun;

create table asignacion_articulos(
	id serial PRIMARY KEY,
	codigo_articulo VARCHAR(40) NOT NULL,
	cedula_usuario varchar(25) NOT NULL,
	fecha_asignacion varchar(15) NOT NULL,
	fecha_desasignacion varchar(15),
	estado_asignacion boolean NOT NULL,
	foreign key(codigo_articulo) references articulo(codigo),
	foreign key(cedula_usuario) references usuario(cedula)
);

select responsable, descripcion, fecha_asignacion from articulo 
inner join asignacion_articulos on codigo_articulo = codigo
inner join usuario on  cedula = cedula_usuario where cedula = '29638383';



create table articulo(
	codigo varchar(40) not null primary key,
	descripcion varchar not null,
	marca varchar(35),
	modelo varchar(35),
	serial varchar(40),
	estado_actual varchar(25) not null,
	condicion_ingreso varchar not null,
	fecha_ingreso varchar(15) not null,
	factura varchar not null,
	asignado boolean not null	
);

create table usuario (
	cedula varchar(10) not null unique primary key,
	responsable varchar(60) not null,
	estado boolean not null,
	fecha_retiro varchar
);
-- estado -> true = activo o  false = retirado
select * from usuario;
select * from articulo;
select * from asignacion_articulos;

insert into asignacion_articulos(codigo_articulo, cedula_usuario, fecha_asignacion) 
values('1-0102-01', '29825369', '10/08/2019');


select * from usuario where cedula = '29825369';


select responsable, descripcion from articulo 
inner join asignacion_articulos on codigo_articulo = codigo
inner join usuario on  cedula = cedula_usuario;

insert into articulo(codigo, descripcion, marca, modelo, serial, estado_actual, condicion_ingreso, fecha_ingreso, factura,asignado)
values('1-0102-01', 'Mesa secretarial base metal y tope madera', 's/m', 'mesa', 's/n', 
	   'activo', 'Patrimonial/Prestado', 
	   '14/07/2020','factura1');

