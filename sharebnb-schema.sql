CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY, 
    password VARCHAR(25) NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT NOT NULL
        CHECK position('@' IN email > 1)
);

CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(25),
    description TEXT NOT NULL,
    location VARCHAR(25),
    price INTEGER (CHECK > 0),
    image TEXT DEFAULT 'default.jpg'
    user VARCHAR(25) NOT NULL 
      REFERENCES users ON DELETE CASCADE
); 

CREATE TABLE messages (
    id SERIAL PRIMARY KEY, 
    text TEXT NOT NULL, 
    sent_time TIMESTAMP,
    to_user VARCHAR(25) NOT NULL   
      REFERENCES users ON DELETE CASCADE
    from_user VARCHAR(25) NOT NULL   
      REFERENCES users ON DELETE CASCADE
); 

CREATE TABLE bookings (
    user VARCHAR(25) NOT NULL 
      REFERENCES users ON DELETE CASCADE
    listing_id INTEGER NOT NULL
      REFERENCES listings ON DELETE CASCADE
    PRIMARY KEY(user, listing_id)
)