const onBoardingQueries = require("../../queries/onBoarding");

module.exports = {
  async onboardUser(req, res) {
    let userId = req.query.userId;
    let strugglewithSleep = req.body.strugglewithSleep;
    let timeToBed = req.body.timeToBed;
    let timeOffBed = req.body.timeOffBed;
    let hoursOfSleep = req.body.hoursOfSleep;

    if (!userId) {
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: "Email is required" });
    }

    try {
      let data = {
        userId: userId,
        strugglewithSleep: strugglewithSleep,
        timeToBed: timeToBed,
        timeOffBed: timeOffBed,
        hoursOfSleep: hoursOfSleep,
      };

      let dataExits = await onBoardingQueries.getOnBoardingData(userId);
      if (dataExits && dataExits != null) {
        res
          .status(422)
          .send({ code: 422, status: "failed", msg: "User Already exist" });
      }

      let onBoardingData = await onBoardingQueries.addOnBoardigData(data);
      return res
        .status(200)
        .send({ code: 200, status: "success", data: onBoardingData });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },
};
