const userQueries = require("../../queries/users");

module.exports = {

    async signupUser(req,res){
        let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let status = req.body.status;
    if (!email) {
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: "Email is required" });
    }

    try {
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        let data = {
          name: name,
          email: email,
          gender: gender,
          dob: dob,
          status: status,
        };
        let userExist = await userQueries.getUserByEmail(email);
        if (userExist && userExist != null) {
          res
            .status(422)
            .send({ code: 422, status: "failed", msg: "User Already exist" });
        }

        let userdata = await userQueries.addUser(data);

        return res
          .status(200)
          .send({ code: 200, status: "success", data: userdata });
      } else {
        res
          .status(422)
          .send({
            code: 422,
            status: "failed",
            msg: "please Provide email in correct formate",
          });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
    }
}