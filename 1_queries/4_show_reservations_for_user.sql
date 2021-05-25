SELECT reservations.id, start_date, end_date, reservations.property_id, reservations.guest_id, properties.id, owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, AVG(rating)
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON reservations.id = reservation_id
WHERE reservations.guest_id = 1 AND end_date < now()::DATE
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;