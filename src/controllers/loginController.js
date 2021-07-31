const Users = require('../models/userModels');
const bcrypt = require('bcryptjs');
class LoginController {
  getLogin(req, res) {
    res.render('login/login');
  }

  getRegister(req, res) {
    res.render('login/register');
  }

  async register(req, res) {
    try {
      const { nombre, email, clave } = req.body;

      if (await Users.findOne({ where: { email } })) {
        res.render('login/register', {
          msg: `El email ${email} ya existe`,
        });
      }
      const hashClave = await bcrypt.hash(clave, 10);
      await Users.create({
        nombre,
        email,
        clave: hashClave,
      })
        .then((data) => {
          const res = {
            success: true,
            data: data,
            message: 'Created successful',
          };
          return res;
        })
        .catch((error) => {
          const res = { success: false, error: error };
          return res;
        });
      res.render('login/login', { register: 'Registrado correcamente' });
    } catch (e) {
      console.log(e);
    }
  }

  login(req, res) {
    const { email, clave } = req.body;
    Users.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          res.render('login/login', {
            msg: 'Email o Clave invalido',
          });
        } else {
          if (bcrypt.compareSync(clave, user.clave)) {
            req.session.admin = true;
            req.session.email = email;
            res.locals.email = email;
            res.redirect('/admin/home');
          } else {
            res.render('login/login', { msg: 'Clave incorrecta' });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}
module.exports = new LoginController();
