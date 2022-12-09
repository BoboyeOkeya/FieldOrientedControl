//MotorParameters(Resistance, d-axis inductance,q-axis inductance, Rotor Flux, Inertia of rotor assembly,PolePair)
class MotorParameters {
  constructor(Rs, Ld, Lq, Psi, J, P) {
    this._Rs = Rs;
    this._Ld = Ld;
    this._Lq = Lq;
    this._Psi = Psi;
    this._J = J;
    this._P = P;
  }
  get Rs() {
    return this._Rs;
  }
  get Ld() {
    return this._Ld;
  }
  get Lq() {
    return this._Lq;
  }
  get Psi() {
    return this._Psi;
  }
  get J() {
    return this._J;
  }
  get P() {
    return this._P;
  }
}

//Control Parameters (sampling time, filter time constant)
class ControlParameters {
  constructor(Ts, Tf) {
    this._Ts = Ts;
    this._Tf = Tf;
  }

  get Ts() {
    return this._Ts;
  }

  get Tf() {
    return this._Tf;
  }

  totalTimeDelayCurrent() {
    let t_sum = 2 * this._Ts + this._Tf;
    return t_sum;
  }

  totalTimeDelaySpeed(currentTs, currentTf, currentTsum) {
    let t_sum =
      1.5 * this._Ts + this._Tf + 2 * currentTsum - currentTf - currentTs / 2;
    return t_sum;
  }
}

//Computes the FOC controller parameters
const computeControlParameters = (motor, currLoop, speedLoop) => {
  //compute d-axis current loop parameters
  let Kp_Id = motor.Ld / (2 * currLoop.totalTimeDelayCurrent());
  let Ti_Id = motor.Ld / motor.Rs;
  let Ki_Id = Kp_Id / Ti_Id;

  //compute q-axis current loop parameters
  let Kp_Iq = motor.Lq / (2 * currLoop.totalTimeDelayCurrent());
  let Ti_Iq = motor.Lq / motor.Rs;
  let Ki_Iq = Kp_Iq / Ti_Iq;

  //compute speed loop parameters
  let totalDelaySpeed = speedLoop.totalTimeDelaySpeed(
    currLoop.Ts,
    currLoop.Tf,
    currLoop.totalTimeDelayCurrent()
  );
  let Kp_w = motor.J / (3 * motor.Psi * motor.P ** 2 * totalDelaySpeed);
  let Ti_w = 4 * totalDelaySpeed;
  let Ki_w = Kp_w / Ti_w;

//Store the controller parameters 
  const controlParam = {
    current_Id_Kp: Kp_Id,
    current_Id_Ki: Ki_Id,
    current_Id_Ti: Ti_Id,
    current_Iq_Kp: Kp_Iq,
    current_Iq_Ki: Ki_Iq,
    current_Iq_Ti: Ti_Iq,
    speed_Kp: Kp_w,
    speed_Ki: Ki_w,
    speed_Ti: Ti_w,
  };
  return controlParam;
};

//Initialize Motor Parameters
const motorBorg = new MotorParameters(
  1.09,
  0.0124,
  0.0124,
  0.1821,
  4.15 * 10 ** -4,
  4
);
//Initialize current and speed loop parameters
const currLoop = new ControlParameters(100 * 10 ** -6, 500 * 10 ** -6);
const speedLoop = new ControlParameters(1 * 10 ** -3, 5 * 10 ** -3);

console.log(computeControlParameters(motorBorg, currLoop, speedLoop));
