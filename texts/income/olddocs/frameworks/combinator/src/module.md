### Modules

M2E modules can include multiple connectors for connecting computational cores based on FPGA SOSC or ARM, which require
more data exchange lines. Data processing cores connect to these connectors, and multiple data exchange interfaces can
be attached to the same connectors. The data transmission interface of M2E modules includes 8 differential pairs and 8
regular data transmission lines.


#### Inverted Module Connectors

Unlike standard M.2 connectors, module boards use female connectors (Mama). This is done for two reasons: modules can be
manufactured based on boards of varying thickness, and the receiving board can be made on an aluminum substrate. M.2
requires a thickness of 0.8 and a double-sided board based on fiberglass; hence, male connectors are located on the Hub
board.

**Module example**
![module.svg](./content/images/Combinator/module.JPG)

**Power module example**
![module.svg](./content/images/Combinator/module-assembly.JPG)