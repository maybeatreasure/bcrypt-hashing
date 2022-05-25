# authetication using bcrypt

This is just I am playing around with bcrypt and hashing.

### NOTES:

- Don't stored password raw on the database instead hash them
- after hashing password a string is generated which cosist of salt and hashed password
- use bcrypt.compare to compare current and stored hashed string
    - It prevent application from timing attacks