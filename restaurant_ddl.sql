CREATE USER 'restaurant_user'@'%' IDENTIFIED BY 'WeW1llF0ll0wPunkR0ck3r';
GRANT ALL PRIVILEGES ON *.* TO 'restaurant_user'@'%' WITH GRANT OPTION;

DROP DATABASE restaurant_ui;
CREATE Database restaurant_ui;
use restaurant_ui;
DROP TABLE IF EXISTS INGREDIENT;
CREATE TABLE IF NOT EXISTS INGREDIENT(
	id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    img VARCHAR(250) NOT NULL
);
DROP TABLE IF EXISTS USER;
CREATE TABLE IF NOT EXISTS USER(
    id INTEGER auto_increment  PRIMARY KEY , 
    firstname VARCHAR(250), 
    lastname VARCHAR(250), 
    username VARCHAR(250), 
    about VARCHAR(250), 
    email VARCHAR(250), 
    password VARCHAR(250), 
    last_login DATETIME, 
    status ENUM('active', 'inactive') DEFAULT 'active', 
    created_at DATETIME , 
    updated_at DATETIME ,
    provider VARCHAR(250),
    id_user VARCHAR(250)
);

DROP TABLE IF EXISTS STRONG_DISH;
CREATE TABLE IF NOT EXISTS STRONG_DISH(
	id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    category VARCHAR(245),
    price DECIMAL(10,2) NOT NULL
);
DROP TABLE IF EXISTS DESSERT;
CREATE TABLE IF NOT EXISTS DESSERT(
	id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
DROP TABLE IF EXISTS ENTREE;
CREATE TABLE IF NOT EXISTS ENTREE(
	id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    category VARCHAR(245),
    price DECIMAL(10,2) NOT NULL
);

DROP TABLE IF EXISTS DRINK;
CREATE TABLE IF NOT EXISTS DRINK(
	id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

DROP TABLE IF EXISTS INGREDIENT_DISH;
CREATE TABLE IF NOT EXISTS INGREDIENT_DISH(
	id_ingredient_dish INT PRIMARY KEY,
    id_ingredient VARCHAR(150) NOT NULL,
    id_dish VARCHAR(150) NOT NULL,
    CONSTRAINT FK_ID_Ingredient FOREIGN KEY (id_ingredient) REFERENCES INGREDIENT(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS RESERVATION;
CREATE TABLE IF NOT EXISTS RESERVATION(
    id INT PRIMARY KEY,
	full_name VARCHAR(250), 
    telephone VARCHAR(250), 
    email VARCHAR(250), 
    date_of_reservation DATETIME , 
    hour_of_reservation VARCHAR(200) ,
    quantity_of_persons VARCHAR(250), 
    comment VARCHAR(250)
);

DROP TABLE IF EXISTS HEADER_INVOICE;
CREATE TABLE IF NOT EXISTS HEADER_INVOICE(
	id_header INT PRIMARY KEY,
    total DECIMAL(10,4)  NOT NULL,
    subtotal DECIMAL(10,4),
    sales_tax DECIMAL(10,4),
    product_id VARCHAR(250),
    product_name VARCHAR(250),
    product_quantity INT
);

DROP TABLE IF EXISTS INVOICE_DETAIL;
CREATE TABLE IF NOT EXISTS INVOICE_DETAIL(
	id_invoice_detail INT PRIMARY KEY,
    client_restaurant INT NOT NULL,
    header_invoice INT NOT NULL,
    order_code VARCHAR(250) NOT NULL,
    date_of_billing DATETIME NOT NULL,
    paypal_id VARCHAR(250),
    paypal_payer_id VARCHAR(250),
    paypal_token VARCHAR(250),
    CONSTRAINT FK_ClientInvoiceDetail FOREIGN KEY (client_restaurant) REFERENCES USER(id) ON DELETE CASCADE,
    CONSTRAINT FK_HeaderInvoiceDetail FOREIGN KEY (header_invoice) REFERENCES HEADER_INVOICE(id_header) ON DELETE CASCADE
);

INSERT INTO INGREDIENT VALUES ('1ING', 'Tomato', '/img/ingredients/tomato.jpg'  );
INSERT INTO INGREDIENT VALUES ('2ING', 'Rice', '/img/ingredients/rice.jpg'   );
INSERT INTO INGREDIENT VALUES ('3ING', 'Lettuce', '/img/ingredients/lettuce.jpg'   );
INSERT INTO INGREDIENT VALUES ('4ING', 'Pasta Spaguetti', '/img/ingredients/spaguetti.jpg');
INSERT INTO INGREDIENT VALUES ('5ING', 'Pasta Lasagna', '/img/ingredients/pasta-lasagna.jpg');
INSERT INTO INGREDIENT VALUES ('6ING', 'Beans', '/img/ingredients/beans.jpg'   );
INSERT INTO INGREDIENT VALUES ('7ING', 'Peperoni', '/img/ingredients/peperoni.jpg'   );
INSERT INTO INGREDIENT VALUES ('8ING', 'Chicken', '/img/ingredients/chicken.jpg'   );
INSERT INTO INGREDIENT VALUES ('9ING', 'Meat', '/img/ingredients/meat.jpg'   );
INSERT INTO INGREDIENT VALUES ('10ING','Ham','/img/ingredients/ham.jpg'   );
INSERT INTO INGREDIENT VALUES ('11ING','Filet Mignon','/img/ingredients/filet-mignon.jpg'   );
INSERT INTO INGREDIENT VALUES ('12ING','Milk','/img/ingredients/milk.jpg'   );
INSERT INTO INGREDIENT VALUES ('13ING','Lemon','/img/ingredients/lemon.jpg'   );
INSERT INTO INGREDIENT VALUES ('14ING','Fish','/img/ingredients/fish.jpg'   );
INSERT INTO INGREDIENT VALUES ('15ING','Cheese','/img/ingredients/cheese.jpg'   );
INSERT INTO INGREDIENT VALUES ('16ING','Strawberry','/img/ingredients/strawberry.jpg'   );
INSERT INTO INGREDIENT VALUES ('17ING','Salmon','/img/ingredients/salmon.jpg'   );
INSERT INTO INGREDIENT VALUES ('18ING','Carrot','/img/ingredients/carrot.jpg'   );
INSERT INTO INGREDIENT VALUES ('19ING','Eggs','/img/ingredients/eggs.jpg'   );
INSERT INTO INGREDIENT VALUES ('20ING','Mushrooms','/img/ingredients/mushrooms.jpg'   );
INSERT INTO INGREDIENT VALUES ('21ING','Bacon','/img/ingredients/bacon.jpg'   );
INSERT INTO INGREDIENT VALUES ('22ING','Red Wine','/img/ingredients/red-wine.jpg'   );
INSERT INTO INGREDIENT VALUES ('23ING','Avocado','/img/ingredients/avocado.jpg'   );
INSERT INTO INGREDIENT VALUES ('24ING','Green Chiles','/img/ingredients/green-chiles.jpg'   );
INSERT INTO INGREDIENT VALUES ('25ING','Dough For Pizza','/img/ingredients/dough-for-pizza.jpg'   );
INSERT INTO INGREDIENT VALUES ('26ING','Cucumber','/img/ingredients/cucumber.jpg'   );
INSERT INTO INGREDIENT VALUES ('27ING','Onion','/img/ingredients/onion.jpg'   );
INSERT INTO INGREDIENT VALUES ('28ING','Olive Oil','/img/ingredients/olive-oil.jpg'   );
INSERT INTO INGREDIENT VALUES ('29ING','Salt','/img/ingredients/salt.jpg'   );
INSERT INTO INGREDIENT VALUES ('30ING','Pepper','/img/ingredients/pepper.jpg'   );
INSERT INTO INGREDIENT VALUES ('31ING','Balsamic Vinegar','/img/ingredients/balsamic-vinegar.jpg'   );
INSERT INTO INGREDIENT VALUES ('32ING','Mustard','/img/ingredients/mustard.jpg'   );
INSERT INTO INGREDIENT VALUES ('33ING','Salted Marcona Almonds','/img/ingredients/salted-Marcona-almonds.jpg'   );
INSERT INTO INGREDIENT VALUES ('34ING','Beets','/img/ingredients/beets.jpg'   );
INSERT INTO INGREDIENT VALUES ('35ING','Ground Beef','/img/ingredients/ground-beef.jpg'   );
INSERT INTO INGREDIENT VALUES ('36ING','Shrimp','/img/ingredients/shrimp.jpg'   );
INSERT INTO INGREDIENT VALUES ('37ING','Sirloin','/img/ingredients/sirloin.jpg'   );
INSERT INTO INGREDIENT VALUES ('38ING','Unsalted butter','/img/ingredients/unsalted-butter.jpg'   );
INSERT INTO INGREDIENT VALUES ('39ING','French bread','/img/ingredients/french-bread.jpg'   );
INSERT INTO INGREDIENT VALUES ('40ING','Parmesan Cheese','/img/ingredients/parmesan-cheese.jpg'   );


INSERT INTO STRONG_DISH VALUES ('1BGD','Lasagna of Chicken',
'Made with stacked 
layers of pasta alternated with sauces and chicken plus vegetables and cheese, and sometimes 
topped with melted grated cheese','/img/strong-dish/lasagna.png','Pasta',14.35);
INSERT INTO STRONG_DISH VALUES ('2BGD','Ceviche',
'It is a dish consisting of marinated meat such as fish, seafood or both - in citrus dressings.',
'/img/strong-dish/ceviche.png','Sea Food',8.50);
INSERT INTO STRONG_DISH VALUES ('3BGD','Hamburguer',
'A hamburger, beefburger or burger is a sandwich consisting of one or more cooked patties of ground meat, usually
 beef, placed inside a sliced bread roll or bun',
 '/img/strong-dish/hamburger.png','Fast Food',5.50);
INSERT INTO STRONG_DISH VALUES ('4BGD','Chicken pie',
'Golden brown pastry and a creamy chicken, leek and
 bacon filling make this a real feast for friends and 
 family','/img/strong-dish/chicken-pie.png','Cake',7.50);
INSERT INTO STRONG_DISH VALUES ('5BGD','Pizza',
'Made with wheat flour, salt, water and yeast, covered with tomato sauce and cheese..',
'/img/strong-dish/pizza.png','Fast Food',12.80);
INSERT INTO STRONG_DISH VALUES ('6BGD','Sushi',
'sushi is the most significant dish that represents Japanese cuisine. 
Its popularity has spread so widely that the word sushi 
is recognized anywhere in the world today. ','/img/strong-dish/sushi.png','Oriental',7.50);
INSERT INTO STRONG_DISH VALUES ('7BGD','Filet Mignon',
'It is cooked wonderfully grilled, also baked or with sauce.Salt and pepper, bacon, sliced mushrooms, 
olive oil, chopped onion in small squares, wheat flour, red wine',
'/img/strong-dish/filet-mignon.png','Meats',14.50);
INSERT INTO STRONG_DISH VALUES ('8BGD','Roasted Beets',
'Bibb Lettuce, Balsamic Dressing','/img/strong-dish/roasted-beets.png','Meats',15.55);
INSERT INTO STRONG_DISH VALUES ('9BGD','Lasagna of Ground Beef',
'Made with stacked layers of pasta alternated with sauces and Ground Beef plus vegetables and cheese, and sometimes 
topped with melted grated cheese','/img/strong-dish/lasagna.png','Cake',16.70);

INSERT INTO DESSERT VALUES('1DESRT','Rice with Milk','Sweet rice with cinnamon and sweet cream','/img/desserts/rice-with-milk.jpg',5.50);
INSERT INTO DESSERT VALUES('2DESRT','Choco Strawberries','Strawberries covered with Chocolate','/img/desserts/choco-strawberries.jpg',7.50);
INSERT INTO DESSERT VALUES('3DESRT','Ice Cream and Caramel','Chocolate ice cream on the crust','/img/desserts/ice-cream-and-caramel.jpg',8.50);
INSERT INTO DESSERT VALUES('4DESRT','Hazelnut Flans','Evaporated milk, sweetened condensed milk and liquefied chocolate and hazelnut cream','/img/desserts/chocolate-and-hazelnut-flans.jpg',4.50);
INSERT INTO DESSERT VALUES('5DESRT','Chocolate pudding','Sugar, flavored with chocolate and vanilla and thickened with a starch','/img/desserts/chocolate-pudding.jpg',7.50);
INSERT INTO DESSERT VALUES('6DESRT','Coconut Flan','Mix milk and condensed milk and add grated coconut','/img/desserts/coconut-flan.jpg',7.50);
INSERT INTO DESSERT VALUES('7DESRT','Flan caramel','The sweetened condensed milk and the evaporated milk make a Flan caramel rich .','/img/desserts/flan-caramel.jpg',7.50);
INSERT INTO DESSERT VALUES('8DESRT','Brownie and Ice Cream','Sweet Ice cream with a brownie','/img/desserts/brownie-with-ice-cream.jpg',7.50);



INSERT INTO ENTREE VALUES ('1ENTR','Ceviche','A little dish with marinated meat 
such as fish, seafood or both - in citrus dressings.','/img/entrees/ceviche.png','Sea Food',6.50);
INSERT INTO ENTREE VALUES ('2ENTR','Grilled Shrimp Salad','A bed of romaine lettuce, followed 
by grilled peppers, corn, and shrimp. Then we 
brighten this salad up with chopped grape tomatoes, a 
diced avocado, and cucumbers.','/img/entrees/grilled-shrimp-salad.png','Salad',7.50);
INSERT INTO ENTREE VALUES ('3ENTR','Grilled Salmon Salad','Light, fresh and healthy 
grilled salmon Greek salad recipe. Crisp vegetables are 
tossed in a tangy lemon basil dressing and topped with
 flaky salmon.','/img/entrees/grilled-salmon-salad.png','Salad',7.50);
INSERT INTO ENTREE VALUES ('4ENTR','Grilled Sirloin Salad','Preheat an outdoor grill for
 high heat and lightly oil the grate. Blend soy sauce, vinegar, brown 
 sugar, sesame oil, garlic, and ginger together in a blender or food
  processor until dressing is smooth. ','/img/entrees/grilled-sirloin-salad.png','Salad',6.60);
INSERT INTO ENTREE VALUES ('5ENTR','French Onion Soup',
'With beef stock base, slow-cooked caramelized onions,
 French bread, gruyere and Parmesan cheese,especially with
 a thick slice of toasted bread loaded with melty Gruyere cheese 
 and lots of caramelized onions.','/img/entrees/french-onion-soup.png','Soup',5.60);
INSERT INTO ENTREE VALUES ('6ENTR','Strips of Filet Mignon','Oybox tomatoes, basil seed vinaigrette .',
'/img/entrees/strips-of-filet-mignon.png','Meat',6.50);
INSERT INTO ENTREE VALUES ('7ENTR','Filet Mignon Sandwich','It is very simple, and 
the filet mignon cut of beef steak is so tender and juicy!
 The steak is very flavorful alone, but is nicely complemented 
 by the flavors of the spread, the 
 vegetables, and the onion bun..','/img/entrees/marinated-filet-mignon-steak-sandwich.png','Meat',7.50);

INSERT INTO DRINK VALUES('1DRK','Coca Cola','Soft Drink','/img/drinks/coca-cola.jpg',3.50);
INSERT INTO DRINK VALUES('2DRK','Coca Cola Light','Light Soft Drink','/img/drinks/coca-cola-light.jpg',4.50);
INSERT INTO DRINK VALUES('3DRK','Coca Cola Zero','Soft Drink without sugar','/img/drinks/coca-cola-zero.jpg',4.50);
INSERT INTO DRINK VALUES('4DRK','Fanta Orange','Soft drink flavored with orange','/img/drinks/fanta-orange.jpg',4.50);
INSERT INTO DRINK VALUES('5DRK','Fanta Kolita','Soft Drink','/img/drinks/fanta-kolita.jpg',4.50);
INSERT INTO DRINK VALUES('6DRK','Fresh Strawberry','Fresh Natural of Strawberry with Milk or water','/img/drinks/fresh-natural-of-strawberry.jpg',4.50);
INSERT INTO DRINK VALUES('7DRK','Fresh of Pear','Fresh Natural of Pear with Milk or water','/img/drinks/fresh-natural-of-pear.jpg',4.50);
INSERT INTO DRINK VALUES('8DRK','Fresh of Blackberry','Fresh Natural of Blackberry with Milk or water','/img/drinks/fresh-natural-of-blackberry.jpg',4.50);
INSERT INTO DRINK VALUES('9DRK','Fresh of Watermelon','Fresh Natural of Watermelon with Milk or water','/img/drinks/fresh-natural-of-watermelon.jpg',4.50);
INSERT INTO DRINK VALUES('10DRK','Fresh of Oats','Fresh Natural of Oat with Milk or water','/img/drinks/fresh-natural-of-oats.jpg',4.50);
INSERT INTO DRINK VALUES('11DRK','Fresh of Chocolate','Fresh Natural of Chocolate with Milk','/img/drinks/fresh-natural-of-chocolate.jpg',4.50);


/*Lasagna*/
INSERT INTO INGREDIENT_DISH VALUES(1,'5ING','1BGD');
INSERT INTO INGREDIENT_DISH VALUES(2,'8ING','1BGD');
INSERT INTO INGREDIENT_DISH VALUES(3,'15ING','1BGD');
INSERT INTO INGREDIENT_DISH VALUES(4,'20ING','1BGD');
/*Ceviche**/
INSERT INTO INGREDIENT_DISH VALUES(5,'1ING','2BGD');
INSERT INTO INGREDIENT_DISH VALUES(6,'13ING','2BGD');
INSERT INTO INGREDIENT_DISH VALUES(7,'14ING','2BGD');
INSERT INTO INGREDIENT_DISH VALUES(8,'24ING','2BGD');
/*Hamburger*/
INSERT INTO INGREDIENT_DISH VALUES(9,'1ING','3BGD');
INSERT INTO INGREDIENT_DISH VALUES(10,'3ING','3BGD');
INSERT INTO INGREDIENT_DISH VALUES(11,'10ING','3BGD');
INSERT INTO INGREDIENT_DISH VALUES(12,'15ING','3BGD');
/*Chicken pie*/
INSERT INTO INGREDIENT_DISH VALUES(13,'1ING','4BGD');
INSERT INTO INGREDIENT_DISH VALUES(14,'3ING','4BGD');
INSERT INTO INGREDIENT_DISH VALUES(15,'8ING','4BGD');
INSERT INTO INGREDIENT_DISH VALUES(16,'20ING','4BGD');
/*Pizza**/
INSERT INTO INGREDIENT_DISH VALUES(17,'1ING','5BGD');
INSERT INTO INGREDIENT_DISH VALUES(18,'7ING','5BGD');
INSERT INTO INGREDIENT_DISH VALUES(19,'20ING','5BGD');
INSERT INTO INGREDIENT_DISH VALUES(20,'16ING','5BGD');
INSERT INTO INGREDIENT_DISH VALUES(21,'25ING','5BGD');
/*Sushi**/
INSERT INTO INGREDIENT_DISH VALUES(22,'2ING','6BGD');
INSERT INTO INGREDIENT_DISH VALUES(23,'14ING','6BGD');
INSERT INTO INGREDIENT_DISH VALUES(24,'23ING','6BGD');
INSERT INTO INGREDIENT_DISH VALUES(25,'26ING','6BGD');
/*Filet Mignon*/
INSERT INTO INGREDIENT_DISH VALUES(26,'11ING','7BGD');
INSERT INTO INGREDIENT_DISH VALUES(27,'20ING','7BGD');
INSERT INTO INGREDIENT_DISH VALUES(28,'27ING','7BGD');
INSERT INTO INGREDIENT_DISH VALUES(29,'22ING','7BGD');
/*Roasted Beets*/
INSERT INTO INGREDIENT_DISH VALUES(30,'31ING','8BGD');
INSERT INTO INGREDIENT_DISH VALUES(31,'32ING','8BGD');
INSERT INTO INGREDIENT_DISH VALUES(32,'33ING','8BGD');
INSERT INTO INGREDIENT_DISH VALUES(33,'34ING','8BGD');
/*Lasagna with Ground Beef*/
INSERT INTO INGREDIENT_DISH VALUES(34,'5ING','9BGD');
INSERT INTO INGREDIENT_DISH VALUES(35,'35ING','9BGD');
INSERT INTO INGREDIENT_DISH VALUES(36,'15ING','9BGD');
INSERT INTO INGREDIENT_DISH VALUES(37,'20ING','9BGD');
/**Entrees**/
    /*Ceviche**/
    INSERT INTO INGREDIENT_DISH VALUES(38,'1ING','1ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(39,'3ING','1ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(40,'14ING','1ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(41,'13ING','1ENTR');
    /*Grilled Shrimp Salad **/
    INSERT INTO INGREDIENT_DISH VALUES(42,'1ING','2ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(43,'3ING','2ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(44,'13ING','2ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(45,'36ING','2ENTR');
    /*Grilled Salmon Salad**/
    INSERT INTO INGREDIENT_DISH VALUES(46,'1ING','3ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(47,'3ING','3ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(48,'23ING','3ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(49,'17ING','3ENTR');
    /*Grilled Sirloin Salad**/
    INSERT INTO INGREDIENT_DISH VALUES(50,'1ING','4ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(51,'3ING','4ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(52,'13ING','4ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(53,'37ING','4ENTR');
    /*French Onion Soup**/
    INSERT INTO INGREDIENT_DISH VALUES(54,'38ING','5ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(55,'39ING','5ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(56,'40ING','5ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(57,'19ING','5ENTR');
    /*Strips of Filet Mignon**/
    INSERT INTO INGREDIENT_DISH VALUES(58,'1ING','6ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(59,'3ING','6ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(60,'23ING','6ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(61,'11ING','6ENTR');
    /*Marinated Filet Mignon Steak Sandwich**/
    INSERT INTO INGREDIENT_DISH VALUES(62,'1ING','7ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(63,'3ING','7ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(64,'23ING','7ENTR');
    INSERT INTO INGREDIENT_DISH VALUES(65,'11ING','7ENTR');
INSERT INTO USER VALUES 
(1,'Leonardo','Aranibar',
'LeonardoAranibarSanchez','I am Web Developer','laranibarsanchez@gmail.com',
'$2a$08$qP7LVeZRulKdFIVmwsemUem24bSYY9e4pg.NWqJg5p5FCFAIvxTvS',
NULL,'active',NULL,NULL,'system','');

INSERT INTO HEADER_INVOICE (id_header, total,product_id,product_name,product_quantity) VALUES(1,15,'3ENTR','Grilled Salmon Salad',2);
INSERT INTO HEADER_INVOICE (id_header, total,product_id,product_name,product_quantity) VALUES(2,15,'8DESRT','Brownie with Ice Cream',2);

INSERT INTO INVOICE_DETAIL VALUES(1,1,1,'INVC1','2019-03-12 02:30:00',null,null,null);
INSERT INTO INVOICE_DETAIL VALUES(2,1,2,'INVC1','2019-03-12 02:30:00',null,null,null);
