const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result) => {
        console.log(result.rows);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(null);
        return err;
      });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return pool
      .query(`SELECT * FROM users WHERE id = $1`, [id])
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err; 
      })

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  return pool
      .query(`
      INSERT INTO users(name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      `, [user.name, user.email, user.password])
      .then((result) => {
        console.log(result.rows[0]);
      })
      .catch((err) => {
        console.log(err);
      })

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
      .query(`
      SELECT 
        properties.*, reservations.*, AVG(rating) as average_rating
      FROM reservations
        JOIN properties 
          ON properties.id = reservations.property_id 
        JOIN property_reviews 
          ON properties.id = property_reviews.property_id 
        WHERE reservations.guest_id = $1 
        GROUP BY properties.id, reservations.id
        LIMIT $2;`, [guest_id, limit])
      .then((result) => {
        return result.rows;
      })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  let queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  // console.log('options:', options);
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length}`;
    }


    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString += `WHERE owner_id = $${queryParams.length}`;
    }
    

    if (options.minimum_price_per_night) {
      if (queryParams.length > 0) {
        queryString += ' AND';
      } else {
        queryString += ' WHERE';
      };
      queryParams.push(options.minimum_price_per_night);
      queryString += ` cost_per_night >= $${queryParams.length}`
    }

    if (options.maximum_price_per_night) {
      if (queryParams.length > 0) {
        queryString += ' AND';
      } else {
        queryString += ' WHERE';
      }
      queryParams.push(options.maximum_price_per_night);
      queryString += ` cost_per_night <= $${queryParams.length}`
    }

    if (options.minimum_rating) {
      if (queryParams.length > 0) {
        queryString += ' AND';
      } else {
        queryString += ' WHERE';
      }
      queryParams.push(options.minimum_rating);
      queryString += ` rating >= $${queryParams.length} `
    }

    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;

    console.log(queryString, queryParams);

    return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * ADD A PROPERTY TO THE DATABASE
 * @PARAM {{}} PROPERTY AN OBJECT CONTAINING ALL OF THE PROPERTY DETAILS.
 * @RETURN {PROMISE<{}>} A PROMISE TO THE PROPERTY.
 */
// const addProperty = function(property) {
//   const propertyId = OBJECT.KEYS(PROPERTIES).LENGTH + 1;
//   PROPERTY.ID = PROPERTYID;
//   PROPERTIES[PROPERTYID] = PROPERTY;
//   return promise.resolve(property);
// }
// exports.addProperty = addProperty;
