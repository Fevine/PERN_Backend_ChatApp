// SELECT
const GetAllUsers = "SELECT user_id, username, email, phone_number FROM users"
const GetUserByID = "SELECT user_id, username, email, phone_number FROM users WHERE user_id = $1"
const GetUserByUsername = "SELECT user_id, username, email, phone_number FROM users WHERE username = $1"
const GetUserByEmail = "SELECT user_id, username, email, phone_number FROM users WHERE email = $1"
const GetPassword = "SELECT user_id, password FROM users WHERE username = $1"

// INSERT
const CreateUser = "INSERT INTO users( username, email, password, phone_number ) VALUES ( $1, $2, $3, $4 )"

// DELETE
const DeleteUserByID = "DELETE FROM users WHERE user_id = $1"


export default { GetPassword, GetAllUsers, GetUserByID, GetUserByUsername, CreateUser, GetUserByEmail, DeleteUserByID }
