DROP SCHEMA IF EXISTS FOODORDERPOS;
CREATE SCHEMA FOODORDERPOS;
USE FOODORDERPOS;

CREATE TABLE ITEM (
	ID			INT,
	NAME		VARCHAR(100) NOT NULL,
	DESCRIPTION VARCHAR(255),
    IMG 		VARCHAR(255),
    PRICE		FLOAT NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE TYPE (
	ID		INT,
	TYPE 	VARCHAR(100) NOT NULL,
    ITEM_ID INT NOT NULL,
    FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ID)
);

CREATE TABLE STAFF (
	#Use ID to separate Clerk (begin with C) and Manager (begin with M).
    #Example: C90, M03. (Maximum number of Clerks or Managers is 100)
	ID			CHAR(3),
	USERNAME	VARCHAR(100) NOT NULL,
	PASSWORD 	VARCHAR(100) NOT NULL,
    EMAIL 		VARCHAR(100),
    PHONE 		CHAR(10),
	PRIMARY KEY (ID)
);

CREATE TABLE CUSTOMER (
	ID			INT,
	USERNAME	VARCHAR(100) NOT NULL,
	PASSWORD	VARCHAR(100) NOT NULL,
    EMAIL 		VARCHAR(100),
    PHONE 		CHAR(10),
    ADDRESS		VARCHAR(255),
	PRIMARY KEY (ID)
);


#One customer has only one card
CREATE TABLE CARD (
	#This id is customer id
	ID			INT,
    NUMBER		VARCHAR(20) NOT NULL,
    BANK		VARCHAR(100),
    PRIMARY KEY (ID),
    FOREIGN KEY (ID) REFERENCES CUSTOMER(ID)
);

CREATE TABLE MENU (
	ID			INT,
    DATE		DATE,
    STAFF_ID	CHAR(3),
    PRIMARY KEY (ID),
    FOREIGN KEY (STAFF_ID) REFERENCES STAFF(ID)
);

CREATE TABLE MENU_ITEM (
	MENU_ID		INT,
    ITEM_ID		INT,
    PRIMARY KEY (MENU_ID, ITEM_ID),
    FOREIGN KEY (MENU_ID) REFERENCES MENU(ID),
    FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ID)
);

CREATE TABLE ORDERS (
	ID			INT,
    CUSTOMER_ID	INT,
	TIME		DATETIME,
    TOTAL		FLOAT,
    STATUS 		VARCHAR(20) CHECK (STATUS IN('WAITING', 'ACCEPTED', 'DECLINED', 'SERVING', 'DONE')),
    PRIMARY KEY (ID),
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(ID)
);

CREATE TABLE ORDER_ITEM (
	ORDER_ID	INT,
    ITEM_ID		INT,
    QUANTITY	INT,
    PRIMARY KEY (ORDER_ID, ITEM_ID),
    FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ID),
    FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ID)
);

#One order has only one paytem
CREATE TABLE PAMENT (
	#This id is order id
	ID			INT,
    METHOD		VARCHAR(20) CHECK (METHOD IN ('CASH', 'CARD')),
    TIME		DATETIME,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID) REFERENCES ORDERS(ID)
);
