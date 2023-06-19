const userQueries = require("../../queries/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

    async signupUser(req,res){
    let username = req.body.username;
    let email = req.body.email;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let status = req.body.status;
    let password = req.body.password;
    if (!email || !password) return res.status(422).send({ code: 422, status: 'failed', msg: 'Data is required.' });

    try {
        password = await bcrypt.hash(password, 10);
        
        let data = {
          username: username,
          email: email,
          gender: gender,
          dob: dob,
          password:password,
          status: status,
        };
        let userExist = await userQueries.getUserByEmail(email);
        if (userExist) {
          return res
            .status(422)
            .send({ code: 422, status: "failed", msg: "User Already exist" });
        }

        let userdata = await userQueries.addUser(data);

        return res
          .status(200)
          .send({ code: 200, status: "success", data: userdata });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
    },

    async login(req,res){
      let email = req.body.email;
      let password = req.body.password;
      if (!email || !password) return res.status(422).send({ code: 422, status: 'failed', msg: 'Data is required.' });

      try{
          let userExist = await userQueries.getUserByEmail(email)
          if (!userExist) {
            return res
              .status(422)
              .send({ code: 422, status: "failed", msg: "User Not exist" });
          }
          // console.log("object",userExist)
          let result = bcrypt.compareSync(password, userExist.password);
          if (result) {
              let payload = {
                  id: userExist.id, 
                    roles:"user"
              }
              let token = jwt.sign(payload, process.env.JWT_Key, { expiresIn: "500h" });
              return res.status(200).send({ code: 200, status: 'success', token: token });
          } else {
              return res.status(422).send({ code: 422, status: 'failed', msg: 'incorrect password' });
          }

      }catch (err) {
    console.log(err);
    return res
      .status(422)
      .send({ code: 422, status: "failed", msg: err.message });
  }

  },
}