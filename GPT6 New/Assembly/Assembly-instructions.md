# Assembly

Variant A: fit F101; leave F102 empty; servo receives the external 7.4 V rail.
Variant B: fit F102; leave F101 empty; servo receives the external 5 V rail.
Never populate both fuses: doing so joins the two external supplies through the fuses.

R401 is optional CAN bus termination and is DNP in both supplied BOMs.
The board features (four wire pads and six M3 holes) are not purchased components.
Solder external supply wires to TP101/TP102 for 7.4 V, or TP103/TP104 for 5 V. Use suitably rated wire and strain relief. Standoffs are retained at the original centers; do not assume their unspecified electrical-current rating supports 15 A.
J106 screw terminal pins 1/2/3: GND / servo positive / PWM. Verify polarity before connecting a servo.
J105 pins 1/2/3: GND / 7.4 V UBEC monitoring / unused. It is a low-current monitoring header and cannot carry servo current.
J201 pins 1..6: GND, 3.3 V monitor, UART TX, UART RX, EN, BOOT. Use a 3.3 V UART adapter and a common ground.

CPL positions are KiCad absolute coordinates in millimetres; Y is negative upward, angles are native KiCad angles, top side only. SMD-only files are for automated placement; manual THT files include terminals, headers, radial fuses and optical parts. Check rotations against pin 1 and the assembly drawing before production. Vendor-specific rotation corrections have not been certified.

Form the horizontal optical-device leads to the original optical axes and verify their assembled height. Generic standard KiCad LED models show shape rather than authentic IR component color. The fuse model is a conservative rectangular body envelope, not detailed vendor CAD; reserve 23.7 mm above the PCB for it.
The four standard footprint-instance silkscreens near overhanging parts were tailored to the actual outline. All pad geometry remains equal to the standard library footprints. The four library comparison warnings document these graphical changes.
