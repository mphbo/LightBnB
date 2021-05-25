INSERT INTO users (name, email, password)
VALUES ('Larry', 'fake@fakeemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Cecil', 'ihatemyself@hate.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Johnny', 'superuser@superdooperawesomeemails.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Domic Parks', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'charlielevy@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Beach House', 'A beautiful house on the beach', 'https://i.pinimg.com/originals/c5/79/a5/c579a529c01cd39383fc14a367d5ee48.jpg', 'https://blog.bookit.com/wp-content/uploads/2016/07/shutterstock_185842460.jpg', 300, 2, 3, 5, 'Indonesia', 'Kim, 19 jl bypass prof. dr. ida', 'Bagus Mantra', 'Bali', '80551', true),

(2, '3 Bedroom Apartment', 'A nice 3 bedroom apartment in downtown Vancouver', 'https://www.rentwithadvent.com/files/styles/property_listing__slideshow__fullscreen_1x/public/rentals/7191/brighton-405-120-milross-avenue-vancouver-10.jpg?itok=APTmhZ3a', 'https://live.staticflickr.com/5570/14224165936_7dc5c63b8a.jpg', 150, 1, 2, 3, 'Canada', '411 East 18th Avenue', 'Vancouver', 'British Columbia', 'V5V 1E9', true),

(3, '5 bedroom half duplex','A nice spacious 5 bedroom home just off the whitemud', 'https://maps.googleapis.com/maps/api/streetview?location=73-grand-meadow-crescent-nw-edmonton-ab&size=500x375&client=gme-brookfieldresidential&signature=wLU7gn4JFRsmvhg2AX0IUu1SagI=', 'https://www.thewowstyle.com/wp-content/uploads/2015/01/interior-design-style-design-home-house-living-room.jpg', 200, 3, 3, 5, 'Canada', '73 Grand Meadow Cres NW', 'Edmonton', 'Alberta', 'T651A3', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)

VALUES ('2021-08-10', '2021-09-05', 1, 5),
('2021-07-22', '2021-08-21', 2, 4),
('2021-05-29', '2021-06-05', 3, 6);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 2, 1, 3, 'It was a good stay, the location is great!'),
(5, 1, 2, 5, 'It was a beautiful location, right on the sea, amazing stay'),
(6, 3, 3, 4, 'Spacious indeed, and all the people in the area seemed so nice, very safe neighborhood.');
