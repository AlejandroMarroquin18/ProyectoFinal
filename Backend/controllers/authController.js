const { createUser } = require('../services/authServices')

//recordar establecer configuracion de seguridad base
//minimo de letras, que valgan, cosas asi
const createUserController = async (req, res) => {
  console.log('ingreso Create User Controller')
  const { displayName, email, password } = req.body; 
  console.log(displayName)
  console.log(email)
  console.log(password)

  try {
    const result = await createUser(displayName, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en createUser')
    res.status(500).json({ error: error.message }); 
  }
} 

module.exports = { createUserController }