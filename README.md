# Calculating the Controller Parameters for a FOC of a PMSM's speed

## DESCRIPTION

This code calculates the PI controllers parameters for the Id current loop, the Iq current loop, and the speed loop. Attached to this repo is also the block diagram for the electrical and mechanical equation, the block diagram for the q-axis current control loop, and the block diagram for the speed control loop. The block diagram for the d-axis is similar to that of the q-axis, with the exception that the coupling term is different and should be adjusted accordingly.

## Features
The code is in JavaScript.

## How to Use the Code
The code has an example integrated into it and you can easily adjust the motor parameters and the control parameters (i.e the sampling time and filter time constant) for the current and speed loop to suit your application.

Furthermore, one way to run this code is to use your web browser. The steps are listed below:
1. Open your web browser, right-click on any page and select ‘Inspect’. This should show a new side page.
2. On this new side page, search for the “Console” tab.
3. Inside the Console, on the line where the arrow key '>' is, Copy-paste this code (inside the .js file) into this line and press the 'Enter' key on your keyboard.

## Research Methods
The mathematical formulae that compute these controller parameters are derived based on a research method. The method uses the absolute value optimum (or Magnitude Optimum) to select the proportional gain, integral gain, and integral time constant for the d-axis current loop and the q-axis current loop.
The method also uses the symmetric optimum to select the proportional gain, the integral gain, and the integral time constant for the speed loop.
All controllers used are PI controllers.

## References
1. B. Zigmund, A. Terlizzi, X.T. Garcia, R. Pavlanin and L.Salvatore, Experimental evaluation of PI tuning techniques for field-oriented control of permanent magnet synchronous motors, Advances in Electrical and Electronic Engineering, 14, 114-119.
2. Umland, J. W., & Safiuddin, M. (n.d.). Magnitude and symmetric optimum criterion for the design of linear control systems-what is it and does it compare with the others? Conference Record of the 1988 IEEE Industry Applications Society Annual Meeting. doi:10.1109/ias.1988.25302 

