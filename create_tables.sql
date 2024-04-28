CREATE TABLE IF NOT EXISTS "Users"
(
"id" SERIAL NOT NULL,
"username" varchar(40) NOT NULL,
"email" text NOT NULL,
"password" bytea NOT NULL,
"salt" text NOT NULL,
PRIMARY KEY ("id"),
CONSTRAINT "unique_username" UNIQUE ("username"),
CONSTRAINT "unique_email" UNIQUE ("email")
);

CREATE TABLE IF NOT EXISTS "PersonalData"
(
"id" SERIAL NOT NULL,
"first_name" text,
"last_name" text,
PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "UserDataConnection"
(
"user_id" int4 NOT NULL,
"personal_data_id" int4 NOT NULL,
PRIMARY KEY ("user_id"),
FOREIGN KEY ("user_id") REFERENCES "Users" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Categories"
(
"id" bigserial not null,
"user_id" int4 not null,
"name" text not null,
"color" varchar(7) default '#ffffff',
primary key ("id"),
foreign key ("user_id") references "Users" ("id")
    on delete cascade
    on update cascade,
constraint "unique_name_user_id" unique ("user_id", "name")
);

CREATE TABLE IF NOT EXISTS "Subcategories"
(
"id" bigserial not null,
"category_id" int8 not null,
"name" text not null,
primary key ("id"),
foreign key ("category_id") references "Categories" ("id")
    on delete cascade
    on update cascade,
constraint "unique_name_category_id" unique ("category_id", "name")
);


CREATE TABLE IF NOT EXISTS "Records"
(
"id" bigserial not null,
"user_id" int4 not null,
"name" text default 'Untitled name',
"amount" money not null,
"income" bool not null,
"category" int8,
"subcategory" int8,
"description" text,
primary key("id"),
foreign key("user_id") references "Users" ("id")
    on delete cascade
    on update cascade,
foreign key("category") references "Categories" ("id")
    on delete no action
    on update cascade,
foreign key("subcategory") references "Subcategories" ("id")
    on delete no action
    on update cascade

);
